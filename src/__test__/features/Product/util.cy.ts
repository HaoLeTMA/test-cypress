import { toProductFormValues, toProductRequest } from '@features/Product/util'
import { BOOKSHELF_FORM_VALUES, KEYBOARD } from '@test/features/Product/fixtures'

describe('toProductFormValues', () => {
  it('should fill the form with the product details as text', () => {
    // Arrange & Act
    const result = toProductFormValues(KEYBOARD)

    // Assert
    expect(result).to.deep.equal({
      name: 'Nordic Mechanical Keyboard',
      price: '89.5',
      category: 'accessories',
      stock: '40',
    })
  })
})

describe('toProductRequest - when the typed name has surrounding spaces', () => {
  it('should send the trimmed name with the price and stock as numbers', () => {
    // Arrange
    const values = { ...BOOKSHELF_FORM_VALUES, name: '  Walnut Bookshelf ' }

    // Act
    const result = toProductRequest(values)

    // Assert
    expect(result).to.deep.equal({
      name: 'Walnut Bookshelf',
      price: 189,
      category: 'furniture',
      stock: 7,
    })
  })
})
