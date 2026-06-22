import { Locator, Page } from '@playwright/test';
import { users } from '../test-data/users';

export class LoginPage {

    readonly page: Page;
    readonly url: string;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorText: Locator;

    constructor(page: Page, url: string = 'https://www.saucedemo.com/') {
        this.page = page;
        this.url = url;

        this.usernameInput = this.page.locator('[data-test="username"]');
        this.passwordInput = this.page.locator('[data-test="password"]');
        this.loginButton = this.page.locator('[data-test="login-button"]');
        this.errorText = this.page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async loginStandardUser() {
        await this.login(users.standardUser.username, users.standardUser.password);
        await this.loginButton.click()
    }
    
    async loginLockedUser() {
        await this.login(users.lockedUser.username, users.lockedUser.password);
        await this.loginButton.click()
    }
}
