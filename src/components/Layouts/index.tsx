import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'

const Layout = () => {
  const { t } = useTranslation()

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" data-cy="app-title">
            {t('appTitle')}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  )
}

export default Layout
