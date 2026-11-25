import { IProductFormValues } from '@features/Product/interfaces/Product'

export const PRODUCT_PATHS = {
  search: '/products',
  create: '/products/create',
  edit: '/products/:id/edit',
}

export const DEFAULT_PRODUCT_FORM_VALUES: IProductFormValues = {
  name: '',
  price: '',
  category: '',
  stock: '0',
}
