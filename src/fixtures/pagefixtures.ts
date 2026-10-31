

import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvHelper} from '../utils/CsvHelper';
import { SearchResultsPage } from '../pages/searchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { BasePage } from '../pages/BasePage';

//define the types for page fitures:

type pageFixtures = {
    basePage: BasePage
    loginPage: LoginPage,
    homePage: HomePage,
    SearchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfoPage,
    testData: Record<string, string>[]
};

//extend playwright base test:

export let test = baseTest.extend<pageFixtures>({

    basePage: async({page}, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },
    loginPage: async({page}, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage: async({page}, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },
    SearchResultsPage: async({page}, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },
    productInfoPage: async({page}, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },
    testData: async({}, use) => {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }



})


export { expect } from '@playwright/test';