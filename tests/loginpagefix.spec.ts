import {test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';


//Implementing hooks
test.beforeEach(async ({ loginPage, homePage  }) => {
    await loginPage.goToLoginPage();
});

test('@smoke  login page title test', async ({ loginPage }) => {
    const pageTitle = await loginPage.getLoginPageTitile();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe("Account Login");
});

test('@sanity forgot psw link test', async ({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('@smoke  user is able to login the app test', async ({ loginPage, homePage}) => {
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    expect.soft(await homePage.islogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe("My Account");
    
});
//DD_Approach 1. sequence mode -- only 1 test is running with test data one by one using testdata from the fixture.
test( '@sanity login to app using wrong credentials with Data driven test', async ({ loginPage, testData}) => {
    for(let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidLoginErrorDisplayed()).toBeTruthy();
    }
    
});

//DD_Approach 2. without fixtures, parallel mode, read csv directly and lopp the test method row wise..

let testData = CsvHelper.readCsv('src/data/loginData.csv');

for(let row of testData) {

        test(`invalid login test - ${row.username} - &{row.password}`, async ({ loginPage }) => {
            await loginPage.doLogin(row.username, row.password);
            expect(await loginPage.invalidLoginErrorDisplayed()).toBeTruthy();
        } )
    }


let logintestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');

for(let row of logintestData) {

        test(`invalid login test with excel data - ${row.username} - &{row.password}`, async ({ loginPage }) => {
            await loginPage.doLogin(row.username, row.password);
            expect(await loginPage.invalidLoginErrorDisplayed()).toBeTruthy();
        });
    }


let loginJSONData = JsonHelper.readJson('src/data/logindata.json');

for(let row of loginJSONData) {

        test(`invalid login test with Json data - ${row.username} - &{row.password}`, async ({ loginPage }) => {
            await loginPage.doLogin(row.username, row.password);
            expect(await loginPage.invalidLoginErrorDisplayed()).toBeTruthy();
        } )
    }


