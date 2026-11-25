import { mountProductPage } from '@test/features/Product'
import { KEYBOARD } from '@test/features/Product/fixtures'
import i18n from '@utils/languages'

const SEARCH_PATH = '/products'
const KEYBOARD_ROW_INDEX = 1

const openDeleteDialogOfKeyboard = () =>
  cy.get('[data-cy="product-table-row"]').eq(KEYBOARD_ROW_INDEX).find('[data-cy="product-table-delete-button"]').click()

describe('<DeleteProductDialog /> - when the Delete button of a product is clicked', () => {
  it('should show the dialog asking to delete that product', () => {
    // Arrange
    mountProductPage(SEARCH_PATH)

    // Act
    openDeleteDialogOfKeyboard()

    // Assert
    cy.get('[data-cy="product-delete-dialog-title"]').should('have.text', i18n.t('product.delete.title'))
    cy.get('[data-cy="product-delete-dialog-message"]').should(
      'have.text',
      i18n.t('product.delete.message', { name: KEYBOARD.name }),
    )
    cy.get('[data-cy="product-delete-dialog-cancel-button"]').should('have.text', i18n.t('cancel'))
    cy.get('[data-cy="product-delete-dialog-confirm-button"]').should('have.text', i18n.t('delete')).and('be.enabled')
  })
})

describe('<DeleteProductDialog /> - when the Cancel button is clicked', () => {
  it('should close the dialog without deleting the product', () => {
    // Arrange
    mountProductPage(SEARCH_PATH)
    openDeleteDialogOfKeyboard()

    // Act
    cy.get('[data-cy="product-delete-dialog-cancel-button"]').click()

    // Assert
    cy.get('[data-cy="product-delete-dialog"]').should('not.exist')
    cy.get('@deleteProduct.all').should('have.length', 0)
    cy.get('[data-cy="product-table-row"]').eq(KEYBOARD_ROW_INDEX).should('contain.text', KEYBOARD.name)
  })
})
