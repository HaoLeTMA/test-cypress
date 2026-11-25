import { IProductFormValues } from '@features/Product/interfaces/Product'
import { IProductRequest } from '@interfaces/Product'
import { expectCurrentPath } from '@test/components'
import { mountProductPage, serverError } from '@test/features/Product'
import { BOOKSHELF_FORM_VALUES } from '@test/features/Product/fixtures'
import i18n from '@utils/languages'

const CREATE_PATH = '/products/create'
const SEARCH_PATH = '/products'
const DUPLICATE_NAME_MESSAGE = 'A product named "Walnut Bookshelf" already exists'
const CONFLICT_STATUS = 409

const fillProductForm = (values: IProductFormValues) => {
  cy.get('[data-cy="product-form-name-field"] input').type(values.name)
  cy.get('[data-cy="product-form-price-field"] input').type(values.price)
  cy.get('[data-cy="product-form-category-field"] [role="combobox"]').click()
  cy.contains('li[role="option"]', i18n.t(`category.${values.category}`)).click()
  cy.get('[data-cy="product-form-stock-field"] input').clear().type(values.stock)
}

describe('<CreateProduct /> - when valid product details are saved', () => {
  it('should send the entered product, open the products page and show the created notification', () => {
    const expectedRequest: IProductRequest = { name: 'Walnut Bookshelf', price: 189, category: 'furniture', stock: 7 }
    mountProductPage(CREATE_PATH)

    fillProductForm(BOOKSHELF_FORM_VALUES)
    cy.get('[data-cy="product-form-save-button"]').click()

    cy.wait('@createProduct').its('request.body').should('deep.equal', expectedRequest)
    expectCurrentPath(SEARCH_PATH)
    cy.get('[data-cy="notification-message"]').should('have.text', i18n.t('product.notification.created'))
  })
})

describe('<CreateProduct /> - when the server rejects the new product', () => {
  it('should show the server message and stay on the create page', () => {
    mountProductPage(CREATE_PATH, { createProduct: serverError(DUPLICATE_NAME_MESSAGE, CONFLICT_STATUS) })

    fillProductForm(BOOKSHELF_FORM_VALUES)
    cy.get('[data-cy="product-form-save-button"]').click()

    cy.wait('@createProduct')
    cy.get('[data-cy="product-form-error-alert"]').should('have.text', DUPLICATE_NAME_MESSAGE)
    expectCurrentPath(CREATE_PATH)
  })
})
