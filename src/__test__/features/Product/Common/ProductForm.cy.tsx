import i18n from '@utils/languages'
import ProductForm from '@features/Product/Common/ProductForm'
import { DEFAULT_PRODUCT_FORM_VALUES } from '@features/Product/constants'
import { mountWithProviders } from '@test/components'
import { BOOKSHELF_FORM_VALUES } from '@test/features/Product/fixtures'

const field = (name: string) => cy.get(`[data-cy="product-form-${name}-field"]`)
const helperText = (name: string) => field(name).find('.MuiFormHelperText-root')

describe('<ProductForm />', () => {
  it('should render the given product details in the fields', () => {
    // Arrange & Act
    mountWithProviders(
      <ProductForm defaultValues={BOOKSHELF_FORM_VALUES} isSaving={false} onSubmit={cy.stub()} onCancel={cy.stub()} />,
    )

    // Assert
    field('name').find('input').should('have.value', 'Walnut Bookshelf')
    field('price').find('input').should('have.value', '189')
    field('category').find('[role="combobox"]').should('have.text', i18n.t('category.furniture'))
    field('category').find('input').should('have.value', 'furniture')
    field('stock').find('input').should('have.value', '7')
    cy.get('[data-cy="product-form-save-button"]').should('have.text', i18n.t('save'))
    cy.get('[data-cy="product-form-cancel-button"]').should('have.text', i18n.t('cancel'))
  })
})

describe('<ProductForm /> - when the Save button is clicked with empty fields', () => {
  it('should show the name, price and category errors and not save the product', () => {
    // Arrange
    mountWithProviders(
      <ProductForm
        defaultValues={DEFAULT_PRODUCT_FORM_VALUES}
        isSaving={false}
        onSubmit={cy.stub().as('submit')}
        onCancel={cy.stub()}
      />,
    )

    // Act
    cy.get('[data-cy="product-form-save-button"]').click()

    // Assert
    helperText('name').should('have.text', i18n.t('product.validation.nameRequired'))
    helperText('price').should('have.text', i18n.t('product.validation.pricePositive'))
    helperText('category').should('have.text', i18n.t('product.validation.categoryRequired'))
    helperText('stock').should('not.exist')
    cy.get('@submit').should('not.have.been.called')
  })
})
