import { expect } from '@playwright/test';
import { Product } from '../../../utils/dataObjects';
const { test } = require('../../../fixtures/testBase');

test('should show same product details in Listing and Details', {tag: '@p1'},  async ({page, loginPage, productListingPage, productDetailsPage }) => {
    let product : Product;

    await loginPage.goToLoginPage();
    await loginPage.submitLogin(process.env.USER_STANDARD_USERNAME, process.env.USER_STANDARD_PASSWORD);
    await productListingPage.isCorrectPage();

    product = await productListingPage.getProductData();

    await productListingPage.goToDetailsPage();
    await productDetailsPage.isCorrectPage();
    await productDetailsPage.isCorrectProductData(product);
});

test('should be able to go back to Listing page via "Back to products" link"',  async ({page, loginPage, productListingPage, productDetailsPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.submitLogin(process.env.USER_STANDARD_USERNAME, process.env.USER_STANDARD_PASSWORD);
    await productListingPage.isCorrectPage();

    await productListingPage.goToDetailsPage();

    await productDetailsPage.isCorrectPage();
    await productDetailsPage.goBackToListingPage();

    await productListingPage.isCorrectPage();
});