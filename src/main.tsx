import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import './index.css'
import AppProvider from './providers/AppProvider'
import { SidebarProvider } from './providers/SidebarProvider'
import AuthProvider from './providers/AuthProvider'
import './lib/i18n/i18n'
import { ThemeProvider } from 'styled-components'
import { THEME } from '@/theme'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <AppProvider>
        <AuthProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </React.StrictMode>
)
