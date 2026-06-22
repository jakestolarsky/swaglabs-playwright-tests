import { Locator, Page } from '@playwright/test';
import { products } from '../test-data/products';

export class AllItemsPage {

    readonly page: Page;
    readonly url: string;

    readonly inventoryList: Locator;
    readonly inventoryItem: Locator;
    readonly inventoryItemName: Locator;
    readonly pageTitle: Locator;
    readonly shoppingChartLink: Locator;
    readonly shoppingChartBadge: Locator;


    constructor(page: Page, url: string = 'https://www.saucedemo.com/inventory.html') {
        this.page = page;
        this.url = url;

        this.inventoryList = this.page.locator('[data-test="inventory-container"]');
        this.inventoryItem = this.page.locator('[data-test="inventory-item"]');
        this.inventoryItemName = this.page.locator('[data-test="inventory-item-name"]');
        this.pageTitle = this.page.locator('[data-test="title"]');
        this.shoppingChartLink = this.page.locator('[data-test="shopping-cart-link"]');
        this.shoppingChartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async addProductToCart(productTitle: string) {
        await this.getProductButton(productTitle, false).click();
    }

    async removeProductFromCart(productTitle: string) {
        await this.getProductButton(productTitle, true).click();
    }

    async openCart() {
        await this.shoppingChartLink.click();
    }

    getProductCard(productTitle: string): Locator {
        return this.inventoryItem.filter({
            has: this.inventoryItemName.filter({ hasText: productTitle })
        });
    }

    getProductButton(productTitle: string, isRemove: boolean): Locator {
        if(!isRemove) return this.getProductCard(productTitle).getByRole('button', { name: 'Add to cart' });
        else return this.getProductCard(productTitle).getByRole('button', { name: 'Remove' });
    }

}
