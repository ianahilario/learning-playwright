import { Page, Locator, expect } from '@playwright/test';
import { Product } from '../data/data-objects';
import { CartItemComponent } from '../components/cart-item.component';

export class ProductListingPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly products: Locator;
  readonly sortDropdown: Locator;
  readonly cartItem: CartItemComponent;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = this.page.locator('//span[@data-test="title"]');
    this.products = this.page.locator('//div[@data-test="inventory-item"]');
    this.sortDropdown = this.page.locator('//select[@data-test="product-sort-container"]');
    this.cartItem = new CartItemComponent(page);
  }

  //Navigation
  async goToDetailsPage(index?: number) {
    if (index === undefined) {
      await this.products.nth(0).locator('//a/img').click();
    } else {
      await this.products.nth(index).locator('//a/img').click();
    }
  }

  //Assertions
  async isCorrectPage() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.page).toHaveTitle('Swag Labs');
    await expect(this.pageTitle).toHaveText('Products');
  }

  async isCorrectSorting(sortOption: string) {
    let productCount: number;
    let locator = '';

    if (sortOption.includes('Name')) {
      const productNames: string[] = [];
      locator = '//div[@data-test="inventory-item-name"]';

      productCount = await this.products.count();
      for (let index = 0; index < productCount; index++) {
        const value = (await this.products.nth(index).locator(locator).textContent()) as string;
        productNames.push(value);
      }
      await this.sortDropdown.selectOption(sortOption);

      if (sortOption === 'Name (A to Z)' || sortOption === 'Price (low to high)') {
        console.log(productNames.toString());
        productNames.sort();
        console.log(productNames.toString());
      } else if (sortOption === 'Name (Z to A)' || sortOption === 'Price (high to low)') {
        console.log(productNames.toString());
        productNames.reverse();
        console.log(productNames.toString());
      }

      for (let index = 0; index < productCount; index++) {
        const value = (await this.products.nth(index).locator(locator).textContent()) as string;
        expect.soft(value, `Correctly sorted by ${sortOption}`).toBe(productNames[index]);
      }
    } else if (sortOption.includes('Price')) {
      const productPrice: number[] = [];
      locator = '//div[@data-test="inventory-item-price"]';

      productCount = await this.products.count();
      for (let index = 0; index < productCount; index++) {
        const textValue = (await this.products.nth(index).locator(locator).textContent()) as string;
        const value = parseFloat(textValue.split('$')[1]);
        productPrice.push(value);
      }
      await this.sortDropdown.selectOption(sortOption);

      if (sortOption === 'Price (low to high)') {
        productPrice.sort((a, b) => a - b);
      } else if (sortOption === 'Price (high to low)') {
        productPrice.sort((a, b) => b - a);
      }

      for (let index = 0; index < productCount; index++) {
        const value = await this.products.nth(index).locator(locator).textContent();
        expect.soft(value, `Correctly sorted by ${sortOption}`).toBe(`$${productPrice[index]}`);
      }
    }
  }

  //Getter
  async getProductData(index?: number): Promise<Product> {
    let productLocator: Locator;

    index === undefined ? (productLocator = this.products.nth(0)) : (productLocator = this.products.nth(index));

    const productImage = await productLocator.locator('//img[@class="inventory_item_img"]').getAttribute('src');
    const productName = await productLocator.locator('//div[@data-test="inventory-item-name"]').textContent();
    const productDescription = await productLocator.locator('//div[@data-test="inventory-item-desc"]').textContent();
    const productPrice = await productLocator.locator('//div[@data-test="inventory-item-price"]').textContent();

    const productData = {
      imageUrl: productImage,
      name: productName,
      description: productDescription,
      price: productPrice
    };

    return productData;
  }
}
