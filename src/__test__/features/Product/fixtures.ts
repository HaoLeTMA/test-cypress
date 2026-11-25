import { IProductFormValues } from '@features/Product/interfaces/Product'
import { IProduct } from '@interfaces/Product'

// Same records as cypress/fixtures/product/products.json.
export const LAPTOP: IProduct = { id: 1, name: 'Aurora Laptop 14', price: 1299, category: 'electronics', stock: 12 }
export const KEYBOARD: IProduct = {
  id: 2,
  name: 'Nordic Mechanical Keyboard',
  price: 89.5,
  category: 'accessories',
  stock: 40,
}
export const MOUSE: IProduct = { id: 3, name: 'Silent Wireless Mouse', price: 24.99, category: 'accessories', stock: 0 }
export const STANDING_DESK: IProduct = { id: 4, name: 'Oak Standing Desk', price: 449, category: 'furniture', stock: 5 }

export const PRODUCTS: IProduct[] = [LAPTOP, KEYBOARD, MOUSE, STANDING_DESK]

// What a user types to create cypress/fixtures/product/create-product.json.
export const BOOKSHELF_FORM_VALUES: IProductFormValues = {
  name: 'Walnut Bookshelf',
  price: '189',
  category: 'furniture',
  stock: '7',
}
