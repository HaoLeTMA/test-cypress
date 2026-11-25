import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem, Stack, TextField } from '@mui/material'
import { CATEGORY_OPTIONS } from '@constants/Product'
import { IProductSearchFilter } from '@features/Product/interfaces/Product'

interface IProductSearchBarProps {
  filter: IProductSearchFilter
  onKeywordChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onCategoryChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const ProductSearchBar = ({ filter, onKeywordChange, onCategoryChange }: IProductSearchBarProps) => {
  const { t } = useTranslation()

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TextField
        data-cy="product-search-keyword-field"
        label={t('product.search.keyword')}
        value={filter.keyword}
        onChange={onKeywordChange}
        sx={{ flex: 1 }}
      />
      <TextField
        select
        data-cy="product-search-category-field"
        label={t('product.search.category')}
        value={filter.category}
        onChange={onCategoryChange}
        InputLabelProps={{ shrink: true }}
        SelectProps={{ displayEmpty: true }}
        sx={{ minWidth: 220 }}
      >
        <MenuItem value="">{t('product.search.allCategories')}</MenuItem>
        {CATEGORY_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {t(option.labelKey)}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  )
}

export default ProductSearchBar
