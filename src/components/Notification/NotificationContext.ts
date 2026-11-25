import { createContext, useContext } from 'react'

export type NotificationSeverity = 'success' | 'error'

export interface INotificationContext {
  notify: (message: string, severity?: NotificationSeverity) => void
}

export const NotificationContext = createContext<INotificationContext>({ notify: () => undefined })

export const useNotification = () => useContext(NotificationContext)
