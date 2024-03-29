import { expect } from '@playwright/test';
const { test } = require('../../fixtures/testBase');

test.describe('View product details', () => {
    test('should show same product details in Listing and Details', {tag: '@p1'},  async ({page }) => {

    });
});

test('should be able to go back to Listing page via "Back to products" link"',  async ({page }) => {

});


test.describe('Sort', () => {
    test('should show correct sort options',  async ({page }) => {

    });

    test('should sort product by "Name (A to Z)"',  async ({page }) => {

    });

    test('should sort product by "Name (Z to A)"',  async ({page }) => {

    });

    test('should sort product by "Price (low to high)"',  async ({page }) => {

    });

    test('should sort product by "Price (high to low)"',  async ({page }) => {

    });
});