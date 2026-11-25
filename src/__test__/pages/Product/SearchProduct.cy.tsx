import { expectCurrentPath } from '@test/components'
import { mountProductPage, serverError } from '@test/features/Product'
import { KEYBOARD, MOUSE } from '@test/features/Product/fixtures'
import i18n from '@utils/languages'

const SEARCH_PATH = '/products'
const KEYBOARD_ROW_INDEX = 1
const MOUSE_ROW_INDEX = 2
const LOAD_ERROR_MESSAGE = 'Product catalog is unavailable'

const rowButton = (rowIndex: number, button: 'edit' | 'delete') =>
  cy.get('[data-cy="product-table-row"]').eq(rowIndex).find(`[data-cy="product-table-${button}-button"]`)

describe('<SearchProduct /> - when the products cannot be loaded', () => {
  it('should show the load error message instead of the product table', () => {
    // Arrange & Act
    mountProductPage(SEARCH_PATH, { products: serverError(LOAD_ERROR_MESSAGE) })

    // Assert
    cy.wait('@getProducts')
    cy.get('[data-cy="product-search-error-alert"]').should('have.text', i18n.t('product.loadError'))
    cy.get('[data-cy="product-table"]').should('not.exist')
  })
})

describe('<SearchProduct /> - when the Edit button of a product is clicked', () => {
  it('should open the edit page of that product', () => {
    // Arrange
    mountProductPage(SEARCH_PATH)

    // Act
    rowButton(KEYBOARD_ROW_INDEX, 'edit').click()

    // Assert
    expectCurrentPath(`/products/${KEYBOARD.id}/edit`)
  })
})

describe('<SearchProduct /> - when the deletion of a product is confirmed', () => {
  it('should delete that product, close the dialog and show the deleted notification', () => {
    // Arrange
    mountProductPage(SEARCH_PATH)
    rowButton(MOUSE_ROW_INDEX, 'delete').click()

    // Act
    cy.get('[data-cy="product-delete-dialog-confirm-button"]').click()

    // Assert
    cy.wait('@deleteProduct')
      .its('request.url')
      .should('match', new RegExp(`/api/products/${MOUSE.id}$`))
    cy.get('[data-cy="product-delete-dialog"]').should('not.exist')
    cy.get('[data-cy="notification-message"]').should('have.text', i18n.t('product.notification.deleted'))
  })
})
