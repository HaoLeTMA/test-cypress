import { BrowserRouter } from 'react-router-dom'
import AppProviders from '@components/AppProviders'
import AppRoutes from '@routes/index'
import { store } from '@store/index'

const App = () => (
  <AppProviders store={store}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
)

export default App
