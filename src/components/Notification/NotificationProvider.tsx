import { ReactNode, useCallback, useMemo, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { NotificationContext, NotificationSeverity } from '@components/Notification/NotificationContext'

const AUTO_HIDE_MS = 4000

interface INotificationState {
  message: string
  severity: NotificationSeverity
}

interface INotificationProviderProps {
  children: ReactNode
}

const NotificationProvider = ({ children }: INotificationProviderProps) => {
  const [notification, setNotification] = useState<INotificationState | null>(null)

  const notify = useCallback((message: string, severity: NotificationSeverity = 'success') => {
    setNotification({ message, severity })
  }, [])
  const value = useMemo(() => ({ notify }), [notify])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={AUTO_HIDE_MS}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert data-cy="notification-message" severity={notification?.severity ?? 'success'} variant="filled">
          {notification?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
