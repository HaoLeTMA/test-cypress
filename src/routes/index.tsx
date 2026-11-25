import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@components/Layouts'
import { PRODUCT_PATHS } from '@features/Product/constants'
import CreateProduct from '@pages/Product/CreateProduct'
import EditProduct from '@pages/Product/EditProduct'
import SearchProduct from '@pages/Product/SearchProduct'

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Navigate to={PRODUCT_PATHS.search} replace />} />
      <Route path={PRODUCT_PATHS.search} element={<SearchProduct />} />
      <Route path={PRODUCT_PATHS.create} element={<CreateProduct />} />
      <Route path={PRODUCT_PATHS.edit} element={<EditProduct />} />
    </Route>
  </Routes>
)

export default AppRoutes
