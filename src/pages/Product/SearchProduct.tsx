import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Alert, Button, LinearProgress, Stack, Typography } from '@mui/material'
import { PRODUCT_PATHS } from '@features/Product/constants'
import DeleteProductDialog from '@features/Product/Search/DeleteProductDialog'
import ProductSearchBar from '@features/Product/Search/ProductSearchBar'
import ProductTable from '@features/Product/Search/ProductTable'
import useDeleteProduct from '@features/Product/Search/hooks/useDeleteProduct'
import useProductSearch from '@features/Product/Search/hooks/useProductSearch'

const SearchProduct = () => {
  const { t } = useTranslation()
  const { filter, products, isLoading, isError, handleKeywordChange, handleCategoryChange } = useProductSearch()
  const { selectedProduct, isDeleting, openDeleteDialog, closeDeleteDialog, confirmDelete } = useDeleteProduct()

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" data-cy="product-search-title">
          {t('product.searchTitle')}
        </Typography>
        <Button data-cy="product-search-create-button" variant="contained" component={Link} to={PRODUCT_PATHS.create}>
          {t('product.createButton')}
        </Button>
      </Stack>
      <ProductSearchBar filter={filter} onKeywordChange={handleKeywordChange} onCategoryChange={handleCategoryChange} />
      {isLoading && <LinearProgress data-cy="product-search-loading" />}
      {isError && (
        <Alert data-cy="product-search-error-alert" severity="error">
          {t('product.loadError')}
        </Alert>
      )}
      {!isLoading && !isError && <ProductTable products={products} onDelete={openDeleteDialog} />}
      <DeleteProductDialog
        product={selectedProduct}
        isDeleting={isDeleting}
        onCancel={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </Stack>
  )
}

export default SearchProduct
