import { assert } from 'node:console';
import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

//Implementing hooks
test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

let productData = CsvHelper.readCsv('src/data/productlist.csv');

test('@smoke company logo exist on product page', async ({ homePage, SearchResultsPage, basePage }) => {
    await homePage.doSearch('macbook');
    await SearchResultsPage.selectProduct('MacBook Pro');
    await basePage.waitForPageLoad();
    expect(await basePage.isLogoVisible()).toBeTruthy();
})


test(`@sanity verify product images count`, async ({homePage, SearchResultsPage, productInfoPage}) => {

    await homePage.doSearch('macbook');
    await SearchResultsPage.selectProduct('MacBook Pro');
    let imgCount = await productInfoPage.getProductImageCount();
    console.log('total images', imgCount);
    expect(imgCount).toBe(4);
});

test(`@sanity verify product information/Data`, async ({homePage, SearchResultsPage, productInfoPage}) => {

    await homePage.doSearch('macbook');
    await SearchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details: ', actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');
    
    
});

    for(const row of productData)  {
        test(`verify product information/Data - ${row.searchkey}, - ${row.productname}`, async ({homePage, SearchResultsPage, productInfoPage}) => {

            await homePage.doSearch(row.searchkey);
            await SearchResultsPage.selectProduct(row.productname);
            let actualProductInfoMap = await productInfoPage.getProductInfo();
            console.log('Actual Product Details: ', actualProductInfoMap);
            expect.soft(actualProductInfoMap.get('ProductHeader')).toBe(row.productheader);
            expect.soft(actualProductInfoMap.get('Brand')).toBe(row.brand);
            expect.soft(actualProductInfoMap.get('Product Code')).toBe(row.productcode);
            expect.soft(actualProductInfoMap.get('Reward Points') ?? '').toBe(row.rewardpoints);
            expect.soft(actualProductInfoMap.get('ProductPrice')).toBe(row.productprice);
            expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe(row.extaxprice);
            
        });
}

