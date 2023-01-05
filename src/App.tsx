import { useContext } from 'react'
import { Navigate, Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { AuthContext } from './context/auth.context'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'

function App() {
  const { isAuthenticated } = useContext(AuthContext)
  function ProtectedRoute() {
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }
  const RejectedRoute = () => {
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }
  const element = useRoutes([
    {
      path: '/',
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
          path: '/',
          element: <MainLayout />,
          children: [
            {
              path: '/profile',
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
          path: '/login',
          element: (
            <AuthLayout name='Đăng nhập'>
              <Login />
            </AuthLayout>
          )
        },
        {
          path: '/register',
          element: (
            <AuthLayout name='Đăng '>
              <Register />
            </AuthLayout>
          )
        }
      ]
    }
  ])
  return <div className='App'>{element}</div>
}

export default App
