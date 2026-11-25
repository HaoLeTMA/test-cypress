import { IApiError } from '@interfaces/Api'

export const toSearchParams = (params: object): Record<string, string> =>
  Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => [key, String(value)]),
  )

export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data?: Partial<IApiError> }).data
    if (data?.message) return data.message
  }
  return fallback
}
