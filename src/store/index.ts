import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@store/apis/baseApi'

export const makeStore = () =>
  configureStore({
    reducer: { [baseApi.reducerPath]: baseApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  })

export type AppStore = ReturnType<typeof makeStore>

export const store = makeStore()
