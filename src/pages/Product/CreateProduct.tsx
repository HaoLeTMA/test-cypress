import { useTranslation } from 'react-i18next'
import { Stack, Typography } from '@mui/material'
import ProductForm from '@features/Product/Common/ProductForm'
import { DEFAULT_PRODUCT_FORM_VALUES } from '@features/Product/constants'
import useCreateProduct from '@features/Product/Create/hooks/useCreateProduct'

const CreateProduct = () => {
  const { t } = useTranslation()
  const { isSaving, serverError, onSubmit, onCancel } = useCreateProduct()

  return (
    <Stack spacing={3}>
      <Typography variant="h4" data-cy="product-create-title">
        {t('product.createTitle')}
      </Typography>
      <ProductForm
        defaultValues={DEFAULT_PRODUCT_FORM_VALUES}
        isSaving={isSaving}
        serverError={serverError}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Stack>
  )
}

export default CreateProduct
