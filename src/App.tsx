import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom'
import Modal from './components/Modal/Modal'
import { router } from './constant/router'
import { AuthContext } from './context/auth.context'
import { PurchasesContext } from './context/purchasesCart.context'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ProductDetail from './pages/ProductDetail/ProductDetail'
// import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import ChangePassword from './pages/User/components/ChangePassword/ChangePassword'
import Profile from './pages/User/components/Profile/Profile'
import StatusCart from './pages/User/components/StatusCart/StatusCart'
import User from './pages/User/User'

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
      element: <MainLayout />,
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
          element: <MainLayout />,
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
              element: <Cart />
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
            <AuthLayout name='Đăng nhập'>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: router.register,
          element: (
            <AuthLayout name='Đăng ký'>
              <Register />
            </AuthLayout>
          )
        }
      ]
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
