import { useTranslation } from 'react-i18next'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { IProduct } from '@interfaces/Product'

interface IDeleteProductDialogProps {
  product: IProduct | null
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
}

const DeleteProductDialog = ({ product, isDeleting, onCancel, onConfirm }: IDeleteProductDialogProps) => {
  const { t } = useTranslation()

  return (
    <Dialog data-cy="product-delete-dialog" open={Boolean(product)} onClose={onCancel}>
      <DialogTitle data-cy="product-delete-dialog-title">{t('product.delete.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText data-cy="product-delete-dialog-message">
          {t('product.delete.message', { name: product?.name })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button data-cy="product-delete-dialog-cancel-button" onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button
          data-cy="product-delete-dialog-confirm-button"
          color="error"
          variant="contained"
          disabled={isDeleting}
          onClick={onConfirm}
        >
          {t('delete')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteProductDialog
