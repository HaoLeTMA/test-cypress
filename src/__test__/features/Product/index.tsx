import type { StaticResponse } from 'cypress/types/net-stubbing'
import AppRoutes from '@routes/index'
import { mountWithProviders } from '@test/components'

export interface IProductInterceptOverrides {
  products?: StaticResponse
  productDetails?: StaticResponse
  createProduct?: StaticResponse
  updateProduct?: StaticResponse
  deleteProduct?: StaticResponse
}

export const serverError = (message: string, statusCode = 500): StaticResponse => ({
  statusCode,
  body: { message },
})

export const setupProductInterceptors = (overrides: IProductInterceptOverrides = {}) => {
  cy.intercept(
    { method: 'GET', pathname: '/api/products' },
    overrides.products ?? { fixture: 'product/products.json' },
  ).as('getProducts')
  cy.intercept(
    { method: 'GET', pathname: '/api/products/*' },
    overrides.productDetails ?? { fixture: 'product/product-details.json' },
  ).as('getProductDetails')
  cy.intercept(
    { method: 'POST', pathname: '/api/products' },
    overrides.createProduct ?? { statusCode: 201, fixture: 'product/create-product.json' },
  ).as('createProduct')
  cy.intercept(
    { method: 'PUT', pathname: '/api/products/*' },
    overrides.updateProduct ?? { fixture: 'product/update-product.json' },
  ).as('updateProduct')
  cy.intercept(
    { method: 'DELETE', pathname: '/api/products/*' },
    overrides.deleteProduct ?? { fixture: 'product/delete-product.json' },
  ).as('deleteProduct')
}

export const mountProductPage = (path: string, overrides?: IProductInterceptOverrides) => {
  setupProductInterceptors(overrides)
  mountWithProviders(<AppRoutes />, path)
}
