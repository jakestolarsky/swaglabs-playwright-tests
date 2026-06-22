import { test, expect } from '../fixtures/fixture';
import { products } from '../test-data/products';
import { checkoutCustomer } from '../test-data/checkoutCustomer';

const lockedOutUserError = 'Epic sadface: Sorry, this user has been locked out.';

test.describe('Login tests', async () => {

  test('Standard user can log in and see products',
    {
      annotation: [
        { type: 'id', description: '[AUTO-001]' }
      ]
    },
    async ({ loginPage, allItemsPage }) => {
      await test.step('Standard customer signs in with valid credentials', async () => {
        await loginPage.goto();
        await loginPage.loginStandardUser();
      });

      await test.step('Customer is redirected to the product catalog', async () => {
        await expect(allItemsPage.page).toHaveURL(allItemsPage.url);
        await expect(allItemsPage.pageTitle).toHaveText('Products');
        await expect(allItemsPage.inventoryList).toBeVisible();
      });

      await test.step('Catalog shows products available for purchase', async () => {
        await expect(allItemsPage.getProductCard(products.backpack.title)).toBeVisible();
        await expect(allItemsPage.getProductCard(products.bikeLight.title)).toBeVisible();
      });
    });

  test('Locked-out user gets correct error',
    {
      annotation: [
        { type: 'id', description: '[AUTO-002]' }
      ]
    },
    async ({ loginPage }) => {
      await test.step('Locked-out customer tries to sign in', async () => {
        await loginPage.goto();
        await loginPage.loginLockedUser();
      });

      await test.step('Login is rejected with a clear account lock message', async () => {
        await expect(loginPage.page).toHaveURL(loginPage.url);
        await expect(loginPage.errorText).toHaveText(lockedOutUserError);
      });
    });

});

test.describe('Checkout functionality', async () => {

  test('Customer can buy the remaining product after updating the cart',
    {
      annotation: [
        { type: 'id', description: '[AUTO-003]' }
      ]
    },
    async ({ standardUserLoggedIn, allItemsPage, checkoutPage }) => {

      await test.step('Customer adds two products to the cart', async () => {
        await allItemsPage.addProductToCart(products.backpack.title);
        await expect(allItemsPage.shoppingChartBadge).toHaveText("1");
        await allItemsPage.addProductToCart(products.bikeLight.title);
        await expect(allItemsPage.shoppingChartBadge).toHaveText("2");
      });

      await test.step('Customer removes one product before checkout', async () => {
        await allItemsPage.removeProductFromCart(products.backpack.title);
        await expect(allItemsPage.shoppingChartBadge).toHaveText("1");
      });

      await test.step('Cart contains only the product selected for purchase', async () => {
        await allItemsPage.openCart();
        await expect(checkoutPage.getProduct(products.bikeLight.title)).toBeVisible();
        await expect(checkoutPage.getProduct(products.backpack.title)).toBeHidden();
      });

      await test.step('Customer completes checkout with correct order summary', async () => {
        await checkoutPage.startCheckout();
        await checkoutPage.fillCustomerInformation(checkoutCustomer);
        await checkoutPage.continueToSummary();
        await expect(checkoutPage.checkoutSummaryContainer).toBeVisible();
        await expect(checkoutPage.getProduct(products.bikeLight.title)).toBeVisible();
        await expect(checkoutPage.subtotalLabel).toContainText(`Item total: ${products.bikeLight.price}`);
        await checkoutPage.finishOrder();
        await expect(checkoutPage.checkoutCompleteContainer).toBeVisible();
        await expect(checkoutPage.completeHeader).toBeVisible();
      });
    });

  test('Checkout required fields show validation errors',
    {
      annotation: [
        { type: 'id', description: '[AUTO-004]' }
      ]
    },
    async ({ standardUserInCheckout }) => {
      await test.step('Checkout form requires first name', async () => {
        await standardUserInCheckout.continueToSummary();
        await expect(standardUserInCheckout.errorText).toContainText('Error: First Name is required');
      });

      await test.step('Checkout form requires last name', async () => {
        await standardUserInCheckout.fillFirstName('name');
        await standardUserInCheckout.continueToSummary();
        await expect(standardUserInCheckout.errorText).toContainText('Error: Last Name is required');
      });

      await test.step('Checkout form requires postal code', async () => {
        await standardUserInCheckout.fillLastName('last');
        await standardUserInCheckout.continueToSummary();
        await expect(standardUserInCheckout.errorText).toContainText('Error: Postal Code is required');
      });

      await test.step('Customer can continue after filling required fields', async () => {
        await standardUserInCheckout.fillPostalCode('00-001');
        await standardUserInCheckout.continueToSummary();
        await expect(standardUserInCheckout.checkoutSummaryContainer).toBeVisible();
      });
    });
});
