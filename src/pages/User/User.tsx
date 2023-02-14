import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

export default function User() {
  return (
    <div className='mt-[20px]'>
      <div className='grid grid-cols-12 container'>
        <Sidebar />
        <div className='col-span-10 '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
