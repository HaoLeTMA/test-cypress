import '@utils/languages'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import NotificationProvider from '@components/Notification/NotificationProvider'
import { AppStore } from '@store/index'

const theme = createTheme()

interface IAppProvidersProps {
  store: AppStore
  children: ReactNode
}

const AppProviders = ({ store, children }: IAppProvidersProps) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <NotificationProvider>{children}</NotificationProvider>
    </Provider>
  </ThemeProvider>
)

export default AppProviders
