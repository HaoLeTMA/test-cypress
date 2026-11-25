import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNotification } from '@components/Notification/NotificationContext'
import { IProduct } from '@interfaces/Product'
import { useDeleteProductMutation } from '@store/apis/Product'
import { getApiErrorMessage } from '@utils/index'

const useDeleteProduct = () => {
  const { t } = useTranslation()
  const { notify } = useNotification()
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()

  const openDeleteDialog = (product: IProduct) => setSelectedProduct(product)

  const closeDeleteDialog = () => setSelectedProduct(null)

  const confirmDelete = async () => {
    if (!selectedProduct) return
    try {
      await deleteProduct(selectedProduct.id).unwrap()
      setSelectedProduct(null)
      notify(t('product.notification.deleted'))
    } catch (error) {
      notify(getApiErrorMessage(error, t('error.generic')), 'error')
    }
  }

  return { selectedProduct, isDeleting, openDeleteDialog, closeDeleteDialog, confirmDelete }
}

export default useDeleteProduct
