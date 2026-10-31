
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage{

    //Private Locators:
    private readonly hearder: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private map: Map<string, string | number>


    
    // constructor-- of the class, Initialize the locators
    constructor(page: Page){

        super(page);        
        this.hearder = page.getByRole('heading', {  level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div #content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div #content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string | number>();

    };

    //public page actions(methods)/behaviour

    async getProductHeader() {
        return await this.hearder.innerText();
    }


    async getProductImageCount(): Promise<number> {
        //await this.page.waitForTimeout(4000);
        await this.productImages.first().waitFor({state: "visible"});
        return await this.productImages.count();
    }

    /**
     * 
     * @returns this method is returning the actual product data: header, images, metadata, pricing data
     */

    async getProductInfo():Promise<Map<string, string | number>>{
        this.map.set("ProductHeader", await this.getProductHeader());
        this.map.set("ProductImages", await this.getProductImageCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.map;
    }

    //Brand: Apple
    //Product Code: Product 18
    //Reward Points: 800
    //Avaliability: Out of Stock
    private async getProductMetaData():Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for(let data of metaData) {
            let meta = data.split(':');
            let metakey = meta[0].trim();
            let metaVal = meta[1].trim();
            this.map.set(metakey, metaVal)
        }
    }


    //$2,000.00
    //Ex Tax: $2,000.00
     private async getProductPricingData(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice', productPrice);
        this.map.set('ExTaxPrice', exTaxPrice);
    }
}
