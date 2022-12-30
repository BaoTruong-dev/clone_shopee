import { useRoutes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
function App() {
  // eslint-disable-next-line prefer-const
  let element = useRoutes([
    { path: '/', element: <Home /> },
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
        <AuthLayout name='Đăng ký'>
          <Register />
        </AuthLayout>
      )
    }
  ])

  return <div className='App'>{element}</div>
}

export default App
