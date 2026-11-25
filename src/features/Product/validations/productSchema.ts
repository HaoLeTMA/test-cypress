import { TFunction } from 'i18next'
import { z } from 'zod'
import { CATEGORY_OPTIONS } from '@constants/Product'

const NAME_MIN_LENGTH = 3
const NAME_MAX_LENGTH = 50
const WHOLE_NUMBER_PATTERN = /^\d+$/

const CATEGORY_VALUES: string[] = CATEGORY_OPTIONS.map((option) => option.value)

export const createProductSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, t('product.validation.nameRequired'))
      .min(NAME_MIN_LENGTH, t('product.validation.nameMin'))
      .max(NAME_MAX_LENGTH, t('product.validation.nameMax')),
    price: z
      .string()
      .refine((value) => value.trim() !== '' && Number(value) > 0, t('product.validation.pricePositive')),
    category: z.string().refine((value) => CATEGORY_VALUES.includes(value), t('product.validation.categoryRequired')),
    stock: z.string().refine((value) => WHOLE_NUMBER_PATTERN.test(value.trim()), t('product.validation.stockInteger')),
  })
