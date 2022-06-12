import chai from "chai";
const assert = chai.assert;

const bookDropdown = '.block-category-navigation > .listbox > .list > .inactive:nth-child(1) > a';
const scienceBookBtn = '.item-box:nth-child(1) > .product-item > .details > .add-info > .buttons > .button-2';
const fictionBookBtn = '.item-box:nth-child(3) > .product-item > .details > .add-info > .buttons > .button-2';
const healthBookBtn = '.item-box:nth-child(5) > .product-item > .details > .add-info > .buttons > .button-2';
const cartBtn = '.header-links > ul > #topcartlink > .ico-cart > .cart-qty';
const checkoutBtn = '#checkout';
const termsCheckbox = 'body > .ui-dialog > #terms-of-service-warning-box > p';
const signInAlert = '.master-wrapper-main > .center-2 > .page > .page-title > h1';
const scienceBookImg = '.item-box:nth-child(1) > .product-item > .picture > a > img';
const scienceBookAdd = '#add-to-cart-button-13';
const fictionBookImg = '.item-box:nth-child(3) > .product-item > .picture > a > img';
const fictionBookAdd = '#add-to-cart-button-45';
const healthBookImg = '.item-box:nth-child(5) > .product-item > .picture > a > img';
const healthBookAdd = '#add-to-cart-button-22';


const tradePage = {
    termsDenied: async (page) => {
        // await page.waitForSelector(bookDropdown);
        // await page.click(bookDropdown);
        await page.click(scienceBookBtn);
        await page.click(fictionBookBtn);
        await page.click(healthBookBtn);
        await page.click(cartBtn);
        await page.click(checkoutBtn);
        const alertNoAuthCustomer = '#ui-id-2';
        const alertNoAuthCustomerText = await page.textContent(alertNoAuthCustomer);
        assert.strictEqual(alertNoAuthCustomerText, 'Terms of service', 'Не пройдена валидация');
    },
    buyBook: async (page) => {
        await page.click(bookDropdown);
        await page.click(scienceBookImg);
        await page.click(scienceBookAdd);
        await page.click(fictionBookImg);
        await page.click(fictionBookAdd);
        await page.click(healthBookImg);
        await page.click(healthBookAdd);
        const goodsNumber = '.header-links > ul > #topcartlink > .ico-cart > .cart-qty';
        const goodsNumberText = await page.textContent(goodsNumber);
        assert.strictEqual(goodsNumberText, '(3)', 'Неверное количество товаров в корзине');
    }
}

export default tradePage