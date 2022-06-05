import chai from 'chai';
import {run, stop} from '../lib/browser';
const assert = chai.assert;

describe ('UI-тесты DWS', async () => {
    let page
    const registerBtn = '.header-links-wrapper > .header-links > ul > li > .ico-register';
    const genderRadioBtn = '#gender-male';
    const firstNameField = '#FirstName';
    const lastNameField = '#LastName';
    const emailField = '#Email';
    const newPasswordField = '#Password';
    const confirmPasswordField = '#ConfirmPassword';
    const CreateBtn = '#register-button';
    const authorizedBtn = '.header-links-wrapper > .header-links > ul > li > .ico-login';
    const loginBtn = '.returning-wrapper > .form-fields > form > .buttons > .button-1';
    const accountInfo = '.header-links-wrapper > .header-links > ul > li > .account';
    const changeInfoBtn = '.page > .page-body > form > .buttons > .button-1';


    beforeEach(async () => {
        page = await run ('http://demowebshop.tricentis.com/');
    });
    afterEach(async () => {
        await stop();
    });

    it ('Регистрация пользователя', async () => {
        await page.click(registerBtn);
        await page.click(genderRadioBtn);
        await page.click(firstNameField)
        await page.fill(firstNameField, 'Test');
        await page.click(lastNameField);
        await page.fill(lastNameField, 'Testov');
        await page.click(emailField);
        await page.fill(emailField, 'afiyas+22@mail.ru');
        await page.click(newPasswordField);
        await page.fill(newPasswordField, 'Qwe12345');
        await page.click(confirmPasswordField);
        await page.fill(confirmPasswordField, 'Qwe12345');
        await page.click(CreateBtn);
        const registerResult = '.header-links-wrapper > .header-links > ul > li > .account';
        const registerResultText = await page.textContent(registerResult);
        assert.strictEqual(registerResultText, 'afiyas+22@mail.ru', 'Пользователь не зарегистрирован')
    });

    it ('Уникальность пользователя', async () => {
        await page.click(registerBtn);
        await page.click(genderRadioBtn);
        await page.click(firstNameField)
        await page.fill(firstNameField, 'Test');
        await page.click(lastNameField);
        await page.fill(lastNameField, 'Testov');
        await page.click(emailField);
        await page.fill(emailField, 'afiyas+5@mail.ru');
        await page.click(newPasswordField);
        await page.fill(newPasswordField, 'Qwe12345');
        await page.click(confirmPasswordField);
        await page.fill(confirmPasswordField, 'Qwe12345');
        await page.click(CreateBtn);
        const alertMessage = '.page-body > .message-error > .validation-summary-errors > ul > li';
        const alertMessageText = await page.textContent(alertMessage);
        assert.strictEqual(alertMessageText, 'The specified email already exists', 'Сломалась валидация уникального пользователя')
    });

    it ('Авторизация невалидного пользователя', async () => {
        await page.click(authorizedBtn);
        await page.click(emailField);
        await page.fill(emailField, 'afiyass@mail.ru');
        await page.click(newPasswordField);
        await page.fill(newPasswordField, 'Qweqwe');
        await page.click(loginBtn);
        const wrongUser = 'form > .message-error > .validation-summary-errors > ul > li';
        const wrongUserText = await page.textContent(wrongUser);
        assert.strictEqual(wrongUserText, 'No customer account found', 'Проверка на валидность доступов не пройдена');
    })

    it ('Авторизация валидного пользователя', async () => {
        await page.click(authorizedBtn);
        await page.click(emailField);
        await page.fill(emailField, 'afiyas+5@mail.ru');
        await page.click(newPasswordField);
        await page.fill(newPasswordField, 'Qwe12345');
        await page.click(loginBtn);
        const registerResult = '.header-links-wrapper > .header-links > ul > li > .account';
        const registerResultText = await page.textContent(registerResult);
        assert.strictEqual(registerResultText, 'afiyas+5@mail.ru', 'Пользователь не авторизован')
    });

    it ('Изменение email аккаунта', async () => {
        await page.click(authorizedBtn);
        await page.click(emailField);
        await page.fill(emailField, 'afiyas+21@mail.ru');
        await page.click(newPasswordField);
        await page.fill(newPasswordField, 'Qwe12345');
        await page.click(loginBtn);
        await page.click(accountInfo);
        await page.click(emailField);
        await page.fill(emailField, 'afiyas+2@bk.ru');
        await page.click(changeInfoBtn);
        const registerResult = '.header-links-wrapper > .header-links > ul > li > .account';
        const registerResultText = await page.textContent(registerResult);
        assert.strictEqual(registerResultText, 'afiyas+1@bk.ru', 'Данные пользователя не изменены');
    });
})