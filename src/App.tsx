import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { router } from './constant/router'
import { AuthContext } from './context/auth.context'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import { useIsMutating, useIsFetching } from '@tanstack/react-query'
import Modal from './components/Modal/Modal'
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
