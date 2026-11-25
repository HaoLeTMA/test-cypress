import { CATEGORY_OPTIONS } from '@constants/Product'
import { IProductSearchFilter } from '@features/Product/interfaces/Product'
import { IProduct, ProductCategory } from '@interfaces/Product'

export const DEFAULT_SEARCH_FILTER: IProductSearchFilter = {
  keyword: '',
  category: '',
}

// Waits for the user to stop typing so a keyword sends one request, not one per key.
export const KEYWORD_DEBOUNCE_MS = 300

export const EMPTY_PRODUCT_LIST: IProduct[] = []

export const OUT_OF_STOCK_QUANTITY = 0

export const TABLE_COLUMN_COUNT = 5

export const CATEGORY_LABEL_KEYS = Object.fromEntries(
  CATEGORY_OPTIONS.map((option) => [option.value, option.labelKey]),
) as Record<ProductCategory, string>
