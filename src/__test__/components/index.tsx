import { ReactNode } from 'react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import AppProviders from '@components/AppProviders'
import { makeStore } from '@store/index'

// Memory router has no address bar: tests read the path from this hidden element.
const CurrentPath = () => (
  <div data-cy="current-path" hidden>
    {useLocation().pathname}
  </div>
)

// A fresh store per mount keeps the RTK Query cache from leaking between tests.
export const mountWithProviders = (ui: ReactNode, initialPath = '/') =>
  cy.mount(
    <AppProviders store={makeStore()}>
      <MemoryRouter initialEntries={[initialPath]}>
        {ui}
        <CurrentPath />
      </MemoryRouter>
    </AppProviders>,
  )

export const expectCurrentPath = (path: string) => cy.get('[data-cy="current-path"]').should('have.text', path)
