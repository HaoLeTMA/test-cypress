import { mountProductPage } from '@test/features/Product'
import i18n from '@utils/languages'

const SEARCH_PATH = '/products'
const KEYWORD = 'Desk'

const keywordInput = () => cy.get('[data-cy="product-search-keyword-field"] input')
const categorySelect = () => cy.get('[data-cy="product-search-category-field"] [role="combobox"]')

describe('<ProductSearchBar /> - when a keyword is typed', () => {
  it('should request the products matching the keyword', () => {
    // Arrange
    mountProductPage(SEARCH_PATH)
    cy.wait('@getProducts')

    // Act
    keywordInput().type(KEYWORD)

    // Assert
    cy.wait('@getProducts').its('request.query').should('deep.equal', { keyword: KEYWORD })
    keywordInput().should('have.value', KEYWORD)
  })
})

describe('<ProductSearchBar /> - when a category is selected after a keyword is typed', () => {
  it('should request the products matching both the keyword and the category', () => {
    // Arrange
    mountProductPage(SEARCH_PATH)
    cy.wait('@getProducts')
    keywordInput().type(KEYWORD)
    cy.wait('@getProducts')

    // Act
    categorySelect().click()
    cy.contains('li[role="option"]', i18n.t('category.furniture')).click()

    // Assert
    cy.wait('@getProducts').its('request.query').should('deep.equal', { keyword: KEYWORD, category: 'furniture' })
    categorySelect().should('have.text', i18n.t('category.furniture'))
    keywordInput().should('have.value', KEYWORD)
  })
})
