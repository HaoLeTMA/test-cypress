import { ChangeEvent, useEffect, useState } from 'react'
import { DEFAULT_SEARCH_FILTER, EMPTY_PRODUCT_LIST, KEYWORD_DEBOUNCE_MS } from '@features/Product/Search/constants'
import { IProductSearchFilter } from '@features/Product/interfaces/Product'
import { ProductCategory } from '@interfaces/Product'
import { useGetProductsQuery } from '@store/apis/Product'

const useProductSearch = () => {
  const [filter, setFilter] = useState<IProductSearchFilter>(DEFAULT_SEARCH_FILTER)
  const [searchKeyword, setSearchKeyword] = useState(DEFAULT_SEARCH_FILTER.keyword)

  useEffect(() => {
    const timer = setTimeout(() => setSearchKeyword(filter.keyword.trim()), KEYWORD_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [filter.keyword])

  const {
    data: products = EMPTY_PRODUCT_LIST,
    isLoading,
    isError,
  } = useGetProductsQuery({
    keyword: searchKeyword,
    category: filter.category || undefined,
  })

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFilter((current) => ({ ...current, keyword: event.target.value }))

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFilter((current) => ({ ...current, category: event.target.value as ProductCategory | '' }))

  return { filter, products, isLoading, isError, handleKeywordChange, handleCategoryChange }
}

export default useProductSearch
