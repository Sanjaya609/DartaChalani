import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import queryClient from '@/lib/react-query'
import toastConfig from '@/config/toast.config'

interface IAppProvider {
  children: React.ReactNode
}

function AppProvider({ children }: IAppProvider) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer {...toastConfig} />
    </QueryClientProvider>
  )
}

export default AppProvider
