import { Locator, Page } from '@playwright/test';

type CheckoutCustomer = {
    firstName: string;
    lastName: string;
    postalCode: string;
};

export class CheckoutPage {

    readonly page: Page;

    readonly cartItem: Locator;
    readonly cartItemName: Locator;
    readonly checkoutButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly errorText: Locator;
    readonly checkoutSummaryContainer: Locator;
    readonly subtotalLabel: Locator;
    readonly finishButton: Locator;
    readonly checkoutCompleteContainer: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartItem = this.page.locator('[data-test="inventory-item"]');
        this.cartItemName = this.page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = this.page.locator('[data-test="checkout"]');
        this.firstNameInput = this.page.locator('[data-test="firstName"]');
        this.lastNameInput = this.page.locator('[data-test="lastName"]');
        this.postalCodeInput = this.page.locator('[data-test="postalCode"]');
        this.continueButton = this.page.locator('[data-test="continue"]');
        this.errorText = this.page.locator('[data-test="error"]');
        this.checkoutSummaryContainer = this.page.locator('[data-test="checkout-summary-container"]');
        this.subtotalLabel = this.page.locator('[data-test="subtotal-label"]');
        this.finishButton = this.page.locator('[data-test="finish"]');
        this.checkoutCompleteContainer = this.page.locator('[data-test="checkout-complete-container"]');
        this.completeHeader = this.page.locator('[data-test="complete-header"]');
    }

    getProduct(productTitle: string): Locator {
        return this.cartItem.filter({
            has: this.cartItemName.filter({ hasText: productTitle })
        });
    }

    async startCheckout() {
        await this.checkoutButton.click();
    }

    async fillFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillPostalCode(postalCode: string) {
        await this.postalCodeInput.fill(postalCode);
    }

    async fillCustomerInformation(customer: CheckoutCustomer) {
        await this.fillFirstName(customer.firstName);
        await this.fillLastName(customer.lastName);
        await this.fillPostalCode(customer.postalCode);
    }

    async continueToSummary() {
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}
