
import {test, expect,} from '@playwright/test';

//Intercept the network calls...
test('intercept and log the requests', async ({page}) => {

    page.route('**/*', async(route) => {
        console.log(route.request().method(), route.request().url());
        route.continue(); //url1 -- capture the info and continue, then again go to url2 and continue
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home')
});


test('mock the search data api', async ({ page }) => {

    let fakeProducts = [
        {name: 'Fake MacBook Pro', price: '$500.00'},
        {name: 'Fake iphone 20', price: '$999'}
    ]

    await page.route('**/index.php?route=product/search&search=macbook', async(route) => {

        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts),
        })
    })

    await page.goto('https://naveenautomationlabs.com/index.php?route=product/search&search=macbook');

    //await page.pause();

    let fakeJson = await page.evaluate(async () => {
        let fakeRes = await fetch('https://naveenautomationlabs.com/index.php?route=product/search&search=macbook');
        return await fakeRes.json();
    });

    console.log('fake json response: ', fakeJson);
})