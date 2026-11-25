import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, MenuItem, Stack, TextField } from '@mui/material'
import { CATEGORY_OPTIONS } from '@constants/Product'
import { IProductFormValues } from '@features/Product/interfaces/Product'
import { createProductSchema } from '@features/Product/validations/productSchema'

interface IProductFormProps {
  defaultValues: IProductFormValues
  isSaving: boolean
  serverError?: string
  onSubmit: (values: IProductFormValues) => void
  onCancel: () => void
}

const ProductForm = ({ defaultValues, isSaving, serverError, onSubmit, onCancel }: IProductFormProps) => {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<IProductFormValues>({
    defaultValues,
    resolver: zodResolver(createProductSchema(t)),
  })

  return (
    <Stack component="form" noValidate spacing={2} maxWidth={480} onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <Alert data-cy="product-form-error-alert" severity="error">
          {serverError}
        </Alert>
      )}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            data-cy="product-form-name-field"
            label={t('product.form.name')}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            data-cy="product-form-price-field"
            label={t('product.form.price')}
            type="number"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            data-cy="product-form-category-field"
            label={t('product.form.category')}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.labelKey)}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="stock"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            data-cy="product-form-stock-field"
            label={t('product.form.stock')}
            type="number"
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Stack direction="row" spacing={2}>
        <Button data-cy="product-form-save-button" type="submit" variant="contained" disabled={isSaving}>
          {t('save')}
        </Button>
        <Button data-cy="product-form-cancel-button" variant="outlined" onClick={onCancel}>
          {t('cancel')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default ProductForm
