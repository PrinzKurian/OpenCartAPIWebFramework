
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    //Private Locators:
    
    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    private readonly search: Locator;
    //private readonly searchIcon: Locator;

    
    // constructor-- of the class, Initialize the locators
    constructor(page: Page){

        super(page);        
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', {level : 2 });
        this.search = page.getByRole('textbox', { name: 'Search' });// dummy loc
        //this.searchIcon = page.locator('.btn.btn-default.btn-lg');

    }

    //public page actions(methods)/behaviour

    // async getHomePageTitle():Promise<string> {
    //     return await this.page.title();
    // }

    async islogoutLinkExist(): Promise<Boolean>{
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders(): Promise<string[]>{
        return await this.headers.allInnerTexts();
    }

    async doSearch(serchKey: string): Promise<void>{
        console.log(`search key: ${serchKey}`);
        await this.searchBox.fill(serchKey);
        await this.searchIcon.click();
    }

}