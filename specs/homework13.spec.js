import {run, stop} from '../lib/browser';
import app from "../pages";

describe ('UI-тесты DWS на PageObject', async () => {
    let page
    beforeEach(async () => {
        page = await run ('http://demowebshop.tricentis.com/');
    });
    afterEach(async () => {
        await stop();
    });
    it ('Проверка принятия пользовательского соглашения', async () => {
        app().Trade().termsDenied(page);
    });
    it ('Проверка обновления корзины', async () => {
        app().Trade().buyBook(page);
    });
});



