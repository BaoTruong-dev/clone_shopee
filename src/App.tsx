import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation, useRoutes } from 'react-router-dom'
import Modal from './components/Modal/Modal'
import { router } from './constant/router'
import { AuthContext } from './context/auth.context'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'

function App() {
  const { isAuthenticated } = useContext(AuthContext)
  const isMutating = useIsMutating()
  const isFetching = useIsFetching()
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
              path: router.profile,
              element: <Profile />
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
