import {test, expect} from '../src/fixtures/pagefixtures';

//Implementing hooks
test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
});


test('@smoke home page title test', async ({homePage}) => {
    const pageTitle = await homePage.getPageTitle();
    console.log('home page title : ', pageTitle);
    expect(pageTitle).toBe("My Account");
});

test('@regression logout link exist test', async ({homePage}) => {
    expect(await homePage.islogoutLinkExist()).toBeTruthy();
});

test('@sanity home page headers exist test', async ({homePage}) => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('home page headers : ', allHeaders);
    expect(allHeaders).toHaveLength(4); //No needed to use the soft assertion here. Both are related to the same testcase. If the first is failed doesn't needed to be executed the next
    expect(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});

