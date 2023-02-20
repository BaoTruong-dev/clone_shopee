import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { withRouter } from 'storybook-addon-react-router-v6'
// eslint-disable-next-line import/no-unresolved
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary'
import { AuthProvider } from '../src/context/auth.context'
import { PurchasesProvider } from '../src/context/purchasesCart.context'
import '../src/i18n/i18n'
import '../src/index.css'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false // default: true
    }
  }
})

export const decorators = [
  withRouter,
  (Story) => {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PurchasesProvider>
            <ErrorBoundary>
              <HelmetProvider>
                <Story />
              </HelmetProvider>
            </ErrorBoundary>
          </PurchasesProvider>
        </AuthProvider>
      </QueryClientProvider>
    )
  }
]

// export const decorators = [
//   (Story) => {
//     return (
//       <BrowserRouter>
//         <QueryClientProvider client={queryClient}>
//           <AuthProvider>
//             <PurchasesProvider>
//               <ErrorBoundary>
//                 <HelmetProvider>
//                   <Story />
//                 </HelmetProvider>
//               </ErrorBoundary>
//             </PurchasesProvider>
//           </AuthProvider>
//         </QueryClientProvider>
//       </BrowserRouter>
//     )
//   }
// ]
