import { assert } from 'node:console';
import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

//Implementing hooks
test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});

//DataProvider
let productData = CsvHelper.readCsv('src/data/product.csv');

for(const row of productData) {
    test(`@regression verify search results count - ${row.searchkey}, - ${row.productname}`, async ({homePage, SearchResultsPage}) => {
        await homePage.doSearch(row.searchkey); 
        expect(await SearchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
    });

}


for(const row of productData) {
    test(`@regression verify user is able to land on the product page - ${row.searchkey}, - ${row.productname}`, async ({homePage, SearchResultsPage, page}) => {
    await homePage.doSearch(row.searchkey); 
    await SearchResultsPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);

});
}