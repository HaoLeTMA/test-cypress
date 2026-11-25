import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '@components/Notification/NotificationContext'
import { PRODUCT_PATHS } from '@features/Product/constants'
import { IProductFormValues } from '@features/Product/interfaces/Product'
import { toProductRequest } from '@features/Product/util'
import { useCreateProductMutation } from '@store/apis/Product'
import { getApiErrorMessage } from '@utils/index'

const useCreateProduct = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { notify } = useNotification()
  const [createProduct, { isLoading: isSaving }] = useCreateProductMutation()
  const [serverError, setServerError] = useState<string>()

  const onSubmit = async (values: IProductFormValues) => {
    setServerError(undefined)
    try {
      await createProduct(toProductRequest(values)).unwrap()
      navigate(PRODUCT_PATHS.search)
      notify(t('product.notification.created'))
    } catch (error) {
      setServerError(getApiErrorMessage(error, t('error.generic')))
    }
  }

  const onCancel = () => navigate(PRODUCT_PATHS.search)

  return { isSaving, serverError, onSubmit, onCancel }
}

export default useCreateProduct
