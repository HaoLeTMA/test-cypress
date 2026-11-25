import { ProductCategory } from '@interfaces/Product'

export interface IProductFormValues {
  name: string
  price: string
  category: ProductCategory | ''
  stock: string
}

export interface IProductSearchFilter {
  keyword: string
  category: ProductCategory | ''
}
