import { ProductCategory } from '@interfaces/Product'

export interface ICategoryOption {
  value: ProductCategory
  labelKey: string
}

export const CATEGORY_OPTIONS: ICategoryOption[] = [
  { value: 'electronics', labelKey: 'category.electronics' },
  { value: 'accessories', labelKey: 'category.accessories' },
  { value: 'furniture', labelKey: 'category.furniture' },
  { value: 'books', labelKey: 'category.books' },
]
