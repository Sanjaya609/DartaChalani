import App from '@/App'
import { THEME } from '@/theme'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import './index.css'
import './lib/i18n/i18n'
import AppProvider from './providers/AppProvider'
import AuthProvider from './providers/AuthProvider'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <AppProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </React.StrictMode>
)
