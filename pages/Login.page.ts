import {Page} from '@playwright/test'

export class LoginPage{

    constructor(private page: Page){}

    readonly usernameField = this.page.locator('//input[@data-test="username"]');
    readonly passwordField = this.page.locator('//input[@data-test="password"]');
    readonly loginButton = this.page.locator('//input[@data-test="login-button"]');

    async goToLoginPage(){
        await this.page.goto('https://www.saucedemo.com/')
    }

    async submitLogin(username:string, password:string){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}