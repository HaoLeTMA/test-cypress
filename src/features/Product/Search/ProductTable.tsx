import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { CATEGORY_LABEL_KEYS, OUT_OF_STOCK_QUANTITY, TABLE_COLUMN_COUNT } from '@features/Product/Search/constants'
import { formatPrice, toEditProductPath } from '@features/Product/util'
import { IProduct } from '@interfaces/Product'

interface IProductTableProps {
  products: IProduct[]
  onDelete: (product: IProduct) => void
}

const ProductTable = ({ products, onDelete }: IProductTableProps) => {
  const { t } = useTranslation()

  return (
    <TableContainer component={Paper}>
      <Table data-cy="product-table">
        <TableHead>
          <TableRow>
            <TableCell>{t('product.table.name')}</TableCell>
            <TableCell>{t('product.table.category')}</TableCell>
            <TableCell align="right">{t('product.table.price')}</TableCell>
            <TableCell align="right">{t('product.table.stock')}</TableCell>
            <TableCell align="right">{t('product.table.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell data-cy="product-table-empty" colSpan={TABLE_COLUMN_COUNT} align="center">
                {t('product.table.empty')}
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} data-cy="product-table-row">
                <TableCell data-cy="product-table-name-cell">{product.name}</TableCell>
                <TableCell data-cy="product-table-category-cell">{t(CATEGORY_LABEL_KEYS[product.category])}</TableCell>
                <TableCell data-cy="product-table-price-cell" align="right">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell data-cy="product-table-stock-cell" align="right">
                  {product.stock === OUT_OF_STOCK_QUANTITY ? (
                    <Chip
                      data-cy="product-table-out-of-stock-chip"
                      label={t('product.table.outOfStock')}
                      color="warning"
                      size="small"
                    />
                  ) : (
                    product.stock
                  )}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      data-cy="product-table-edit-button"
                      size="small"
                      component={Link}
                      to={toEditProductPath(product.id)}
                    >
                      {t('edit')}
                    </Button>
                    <Button
                      data-cy="product-table-delete-button"
                      size="small"
                      color="error"
                      onClick={() => onDelete(product)}
                    >
                      {t('delete')}
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable
