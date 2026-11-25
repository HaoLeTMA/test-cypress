import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useNotification } from '@components/Notification/NotificationContext'
import { PRODUCT_PATHS } from '@features/Product/constants'
import { IProductFormValues } from '@features/Product/interfaces/Product'
import { toProductFormValues, toProductRequest } from '@features/Product/util'
import { useGetProductDetailsQuery, useUpdateProductMutation } from '@store/apis/Product'
import { getApiErrorMessage } from '@utils/index'

const isValidProductId = (id: number): boolean => Number.isInteger(id) && id > 0

const useEditProduct = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { notify } = useNotification()
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)
  const isValidId = isValidProductId(productId)

  const { data: product, isError: isLoadError } = useGetProductDetailsQuery(productId, { skip: !isValidId })
  const [updateProduct, { isLoading: isSaving }] = useUpdateProductMutation()
  const [serverError, setServerError] = useState<string>()

  useEffect(() => {
    if (!isValidId || isLoadError) navigate(PRODUCT_PATHS.search, { replace: true })
  }, [isValidId, isLoadError, navigate])

  const defaultValues = useMemo(() => (product ? toProductFormValues(product) : undefined), [product])

  const onSubmit = async (values: IProductFormValues) => {
    setServerError(undefined)
    try {
      await updateProduct({ id: productId, body: toProductRequest(values) }).unwrap()
      navigate(PRODUCT_PATHS.search)
      notify(t('product.notification.updated'))
    } catch (error) {
      setServerError(getApiErrorMessage(error, t('error.generic')))
    }
  }

  const onCancel = () => navigate(PRODUCT_PATHS.search)

  return { defaultValues, isLoading: !defaultValues, isSaving, serverError, onSubmit, onCancel }
}

export default useEditProduct
