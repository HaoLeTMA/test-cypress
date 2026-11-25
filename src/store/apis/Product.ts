import { IApiResponse } from '@interfaces/Api'
import { IProduct, IProductListParams, IProductRequest } from '@interfaces/Product'
import { baseApi } from '@store/apis/baseApi'
import { toSearchParams } from '@utils/index'

export interface IUpdateProductArgs {
  id: number
  body: IProductRequest
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], IProductListParams>({
      query: (params) => ({ url: '/products', params: toSearchParams(params) }),
      transformResponse: (response: IApiResponse<IProduct[]>) => response.data,
      providesTags: ['Product'],
    }),
    getProductDetails: build.query<IProduct, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: IApiResponse<IProduct>) => response.data,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    createProduct: build.mutation<IProduct, IProductRequest>({
      query: (body) => ({ url: '/products', method: 'POST', body }),
      transformResponse: (response: IApiResponse<IProduct>) => response.data,
      invalidatesTags: ['Product'],
    }),
    updateProduct: build.mutation<IProduct, IUpdateProductArgs>({
      query: ({ id, body }) => ({ url: `/products/${id}`, method: 'PUT', body }),
      transformResponse: (response: IApiResponse<IProduct>) => response.data,
      invalidatesTags: ['Product'],
    }),
    deleteProduct: build.mutation<void, number>({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi
