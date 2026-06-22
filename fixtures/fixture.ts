import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AllItemsPage } from '../pages/AllItemsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { products } from '../test-data/products';

type Fixtures = {
    loginPage: LoginPage;
    standardUserLoggedIn: LoginPage;
    allItemsPage: AllItemsPage;
    checkoutPage: CheckoutPage;
    standardUserInCheckout: CheckoutPage;
};

export const test = base.extend<Fixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    standardUserLoggedIn: async ({ page }, use) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.loginStandardUser();

        await use(loginPage);
    },

    allItemsPage: async ({ page }, use) => {
        await use(new AllItemsPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    standardUserInCheckout: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const allItemsPage = new AllItemsPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.loginStandardUser();
        await allItemsPage.addProductToCart(products.backpack.title);
        await allItemsPage.openCart();
        await checkoutPage.startCheckout();

        await use(checkoutPage);
    },
});

export { expect } from '@playwright/test';
