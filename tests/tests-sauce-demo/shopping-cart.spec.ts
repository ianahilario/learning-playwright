import { expect } from '@playwright/test';
const { test } = require('../../fixtures/testBase');


test.describe('Checkout', () => {
    test('should checkout the cart item successfully', {tag: '@p1'},  async ({page }) => {

    });
});

test.describe('Header cart icon', () => {
    test('should not show cart qty indicator when cart is empty',  async ({page }) => {

    });

    test('should update cart qty indicator immediately when adding/removing cart item', {tag: '@p1'},  async ({page }) => {

    });
});

test('should persist cart item when user logs out', {tag: '@p1'},  async ({page }) => {

});

test.describe('Add/remove cart items', () => {
    test('should allow me to add/remove from the cart page', {tag: '@p1'},  async ({page }) => {

    });

    test('should allow me to add/remove from the product listing page', {tag: '@p1'},  async ({page }) => {

    });

    test('should allow me to add/remove from the product details page', {tag: '@p1'},  async ({page }) => {

    });

    test('should appended newly added cart items to the bottom of the cart',  async ({page }) => {

    });
});