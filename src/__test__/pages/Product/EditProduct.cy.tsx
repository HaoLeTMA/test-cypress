import { IProductRequest } from '@interfaces/Product'
import { expectCurrentPath } from '@test/components'
import { mountProductPage } from '@test/features/Product'
import { KEYBOARD } from '@test/features/Product/fixtures'
import i18n from '@utils/languages'

const EDIT_PATH = `/products/${KEYBOARD.id}/edit`

const field = (name: string) => cy.get(`[data-cy="product-form-${name}-field"]`)

describe('<EditProduct /> - when the product is loaded', () => {
  it('should fill the form with the product details', () => {
    mountProductPage(EDIT_PATH)

    field('name').find('input').should('have.value', KEYBOARD.name)
    field('price').find('input').should('have.value', String(KEYBOARD.price))
    field('category').find('[role="combobox"]').should('have.text', i18n.t('category.accessories'))
    field('stock').find('input').should('have.value', String(KEYBOARD.stock))
  })
})

describe('<EditProduct /> - when the changed product is saved', () => {
  it('should send the new values and open the search page with the updated message', () => {
    const updated: IProductRequest = { name: 'Nordic Keyboard Tray', price: 129.9, category: 'furniture', stock: 18 }
    mountProductPage(EDIT_PATH)

    field('name').find('input').clear().type(updated.name)
    field('price').find('input').clear().type(String(updated.price))
    field('category').find('[role="combobox"]').click()
    cy.contains('li[role="option"]', i18n.t('category.furniture')).click()
    field('stock').find('input').clear().type(String(updated.stock))
    cy.get('[data-cy="product-form-save-button"]').click()

    cy.wait('@updateProduct').then(({ request }) => {
      expect(new URL(request.url).pathname).to.equal(`/api/products/${KEYBOARD.id}`)
      expect(request.body).to.deep.equal(updated)
    })
    expectCurrentPath('/products')
    cy.get('[data-cy="notification-message"]').should('contain.text', i18n.t('product.notification.updated'))
  })
})
