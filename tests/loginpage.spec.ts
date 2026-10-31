import {test, expect} from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPage: LoginPage;
let homePage: HomePage;

//Implementing hooks
test.beforeEach(async ({ page  }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await loginPage.goToLoginPage();
});

test('login page title test', async () => {
    const pageTitle = await loginPage.getLoginPageTitile();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe("Account Login");
});

test('forgot psw link test', async () => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user is able to login the app test', async () => {
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    expect.soft(await homePage.islogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe("My Account");
});