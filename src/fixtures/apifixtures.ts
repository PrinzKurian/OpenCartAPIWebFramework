import {test as baseTest} from '@playwright/test';
import { ApiHelper } from '../api/ApiHelper';


//define types for API fixtures:

type ApiFixtures = {
    apiHelper: ApiHelper
}

export let test = baseTest.extend<ApiFixtures>({
    
    apiHelper: async({request}, use) => {
        //fail fast on misconfigured env/secrets -- never print the values, they may be secrets
        let apiBaseURL = process.env.API_BASE_URL;
        if (!apiBaseURL || !/^https?:\/\//.test(apiBaseURL)) {
            throw new Error('API_BASE_URL must be a full URL like https://gorest.co.in -- check the env file / GitHub secret');
        }
        if (!process.env.API_TOKEN) {
            throw new Error('API_TOKEN is not set -- check the env file / GitHub secret');
        }
        let apiHelper = new ApiHelper(
            request,
            apiBaseURL
        );
        await use(apiHelper);
        }, 
})

export { expect } from '@playwright/test';