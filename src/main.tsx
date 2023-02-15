import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
// eslint-disable-next-line import/no-unresolved
import { AuthProvider } from './context/auth.context'
import { PurchasesProvider } from './context/purchasesCart.context'
import './i18n/i18n'
import './index.css'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false // default: true
    }
  }
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PurchasesProvider>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </PurchasesProvider>
        </AuthProvider>
        <ToastContainer autoClose={1000} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
