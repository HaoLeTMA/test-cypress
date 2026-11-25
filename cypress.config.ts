import { defineConfig } from 'cypress'

export default defineConfig({
  // From .env locally (npm scripts load it) and from the CYPRESS_PROJECT_ID repository variable in CI.
  projectId: process.env.CYPRESS_PROJECT_ID,
  video: false,
  allowCypressEnv: false,
  component: {
    devServer: { framework: 'react', bundler: 'vite' },
    specPattern: 'src/__test__/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/component.tsx',
    indexHtmlFile: 'cypress/support/component-index.html',
    viewportWidth: 1280,
    viewportHeight: 800,
  },
})
