import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { lazy, Suspense, useContext, useEffect } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Modal from './components/Modal/Modal'
import { router } from './constant/router'
import { AuthContext } from './context/auth.context'
import { PurchasesContext } from './context/purchasesCart.context'

const AuthLayout = lazy(() => import('./layouts/AuthLayout/AuthLayout'))
const MainLayout = lazy(() => import('./layouts/MainLayout/MainLayout'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const Home = lazy(() => import('./pages/Home/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'))
const Register = lazy(() => import('./pages/Register/Register'))
const ChangePassword = lazy(() => import('./pages/User/components/ChangePassword/ChangePassword'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const Profile = lazy(() => import('./pages/User/components/Profile/Profile'))
const StatusCart = lazy(() => import('./pages/User/components/StatusCart/StatusCart'))
const User = lazy(() => import('./pages/User/User'))

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  const { setPurchasesCart } = useContext(PurchasesContext)
  const isMutating = useIsMutating()
  const isFetching = useIsFetching()
  useEffect(() => {
    document.addEventListener('token_expired', () => {
      setIsAuthenticated(false)
      setPurchasesCart([])
    })
    return () => {
      document.removeEventListener('token_expired', () => {
        setIsAuthenticated(false)
        setPurchasesCart([])
      })
    }
  }, [])
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to={router.login} />
  }
  const RejectedRoute = () => {
    return !isAuthenticated ? <Outlet /> : <Navigate to={router.home} />
  }
  const element = useRoutes([
    {
      path: router.home,
      element: (
        <Suspense>
          <MainLayout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: router.productDetail,
          element: <ProductDetail />
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: router.home,
          element: (
            <Suspense>
              <MainLayout />
            </Suspense>
          ),
          children: [
            {
              path: router.user,
              element: <User />,
              children: [
                {
                  index: true,
                  element: <Profile />
                },
                {
                  path: router.userChangePassword,
                  element: <ChangePassword />
                },
                {
                  path: router.userStatusCart,
                  element: <StatusCart />
                }
              ]
            },
            {
              path: router.cart,
              element: (
                <Suspense>
                  <Cart />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: router.login,
          element: (
            <Suspense>
              <AuthLayout name='Đăng nhập'>
                <Login />
              </AuthLayout>
            </Suspense>
          )
        },
        {
          path: router.register,
          element: (
            <Suspense>
              <AuthLayout name='Đăng ký'>
                <Register />
              </AuthLayout>
            </Suspense>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense>
          <MainLayout>
            <NotFound />
          </MainLayout>
        </Suspense>
      )
    }
  ])
  return (
    <div className='App'>
      {isMutating + isFetching !== 0 && (
        <Modal>
          <div className='lds-ellipsis'>
            <div />
            <div />
            <div />
            <div />
          </div>
        </Modal>
      )}
      {element}
    </div>
  )
}

export default App
