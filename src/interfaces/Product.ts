export type ProductCategory = 'electronics' | 'accessories' | 'furniture' | 'books'

export interface IProduct {
  id: number
  name: string
  price: number
  category: ProductCategory
  stock: number
}

export interface IProductListParams {
  keyword?: string
  category?: ProductCategory
}

export interface IProductRequest {
  name: string
  price: number
  category: ProductCategory
  stock: number
}
