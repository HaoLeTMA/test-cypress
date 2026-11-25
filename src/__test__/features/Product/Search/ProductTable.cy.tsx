import ProductTable from '@features/Product/Search/ProductTable'
import { mountWithProviders } from '@test/components'
import { KEYBOARD, LAPTOP, MOUSE, PRODUCTS, STANDING_DESK } from '@test/features/Product/fixtures'
import i18n from '@utils/languages'

const row = (index: number) => cy.get('[data-cy="product-table-row"]').eq(index)
const cell = (index: number, name: string) => row(index).find(`[data-cy="product-table-${name}-cell"]`)

describe('<ProductTable />', () => {
  it('should render the name, category, price and stock of every product and mark the one out of stock', () => {
    // Arrange
    const expectedRows = [
      { name: LAPTOP.name, category: i18n.t('category.electronics'), price: '$1,299.00', stock: '12' },
      { name: KEYBOARD.name, category: i18n.t('category.accessories'), price: '$89.50', stock: '40' },
      {
        name: MOUSE.name,
        category: i18n.t('category.accessories'),
        price: '$24.99',
        stock: i18n.t('product.table.outOfStock'),
      },
      { name: STANDING_DESK.name, category: i18n.t('category.furniture'), price: '$449.00', stock: '5' },
    ]

    // Act
    mountWithProviders(<ProductTable products={PRODUCTS} onDelete={cy.stub()} />)

    // Assert
    cy.get('[data-cy="product-table-row"]').should('have.length', expectedRows.length)
    expectedRows.forEach((expected, index) => {
      cell(index, 'name').should('have.text', expected.name)
      cell(index, 'category').should('have.text', expected.category)
      cell(index, 'price').should('have.text', expected.price)
      cell(index, 'stock').should('have.text', expected.stock)
    })
    cy.get('[data-cy="product-table-out-of-stock-chip"]').should('have.length', 1)
    row(2).find('[data-cy="product-table-out-of-stock-chip"]').should('exist')
    cy.get('[data-cy="product-table-empty"]').should('not.exist')
  })
})

describe('<ProductTable /> - when the product list is empty', () => {
  it('should display the no products found message', () => {
    // Arrange & Act
    mountWithProviders(<ProductTable products={[]} onDelete={cy.stub()} />)

    // Assert
    cy.get('[data-cy="product-table-empty"]').should('have.text', i18n.t('product.table.empty'))
    cy.get('[data-cy="product-table-row"]').should('not.exist')
  })
})
