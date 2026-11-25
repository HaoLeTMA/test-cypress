import { PRODUCT_PATHS } from '@features/Product/constants'
import { IProductFormValues } from '@features/Product/interfaces/Product'
import { IProduct, IProductRequest, ProductCategory } from '@interfaces/Product'

const PRICE_FORMATTER = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export const formatPrice = (price: number): string => PRICE_FORMATTER.format(price)

export const toEditProductPath = (id: number): string => PRODUCT_PATHS.edit.replace(':id', String(id))

export const toProductFormValues = (product: IProduct): IProductFormValues => ({
  name: product.name,
  price: String(product.price),
  category: product.category,
  stock: String(product.stock),
})

export const toProductRequest = (values: IProductFormValues): IProductRequest => ({
  name: values.name.trim(),
  price: Number(values.price),
  category: values.category as ProductCategory,
  stock: Number(values.stock),
})
