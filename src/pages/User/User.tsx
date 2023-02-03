import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

export default function User() {
  return (
    <div className='mt-[20px]'>
      <div className='grid grid-cols-12 container'>
        <div className='col-span-2 pt-[20px]'>
          <Sidebar />
        </div>
        <div className='col-span-10 rounded-sm p-[20px] shadow-md'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
