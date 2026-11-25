import { useTranslation } from 'react-i18next'
import { CircularProgress, Stack, Typography } from '@mui/material'
import ProductForm from '@features/Product/Common/ProductForm'
import useEditProduct from '@features/Product/Edit/hooks/useEditProduct'

const LOADING_SIZE = 32

const EditProduct = () => {
  const { t } = useTranslation()
  const { defaultValues, isSaving, serverError, onSubmit, onCancel } = useEditProduct()

  return (
    <Stack spacing={3}>
      <Typography variant="h4" data-cy="product-edit-title">
        {t('product.editTitle')}
      </Typography>
      {defaultValues ? (
        <ProductForm
          defaultValues={defaultValues}
          isSaving={isSaving}
          serverError={serverError}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      ) : (
        <CircularProgress data-cy="product-edit-loading" size={LOADING_SIZE} />
      )}
    </Stack>
  )
}

export default EditProduct
