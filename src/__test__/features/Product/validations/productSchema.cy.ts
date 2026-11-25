import i18n from '@utils/languages'
import { createProductSchema } from '@features/Product/validations/productSchema'
import { IProductFormValues } from '@features/Product/interfaces/Product'
import { BOOKSHELF_FORM_VALUES } from '@test/features/Product/fixtures'

const getErrors = (values: IProductFormValues) => {
  const result = createProductSchema(i18n.t.bind(i18n)).safeParse(values)
  return result.success ? [] : result.error.issues.map(({ path, message }) => ({ path, message }))
}

describe('createProductSchema - when every field is valid', () => {
  it('should accept the product', () => {
    // Arrange & Act
    const result = createProductSchema(i18n.t.bind(i18n)).safeParse(BOOKSHELF_FORM_VALUES)

    // Assert
    expect(result.success).to.equal(true)
    expect(result.data).to.deep.equal(BOOKSHELF_FORM_VALUES)
  })
})

describe('createProductSchema - when the name is shorter than 3 characters', () => {
  it('should reject the name with the minimum length message', () => {
    // Arrange & Act
    const errors = getErrors({ ...BOOKSHELF_FORM_VALUES, name: 'Oa' })

    // Assert
    expect(errors).to.deep.equal([{ path: ['name'], message: i18n.t('product.validation.nameMin') }])
  })
})

describe('createProductSchema - when the stock is not a whole number', () => {
  it('should reject the stock with the whole number message', () => {
    // Arrange & Act
    const errors = getErrors({ ...BOOKSHELF_FORM_VALUES, stock: '7.5' })

    // Assert
    expect(errors).to.deep.equal([{ path: ['stock'], message: i18n.t('product.validation.stockInteger') }])
  })
})
