import playwright from 'playwright';
let browser, context, page;

async function run (url) {
    browser = await playwright.chromium.launch(
        {
            headless: false,
            slowMo: 50,
        }
    );
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(url);
    return page;
};

async function stop () {
    await page.screenshot({path: 'screenshot.png'});
    await page.close();
    await browser.close();
}
export  { run, stop }
