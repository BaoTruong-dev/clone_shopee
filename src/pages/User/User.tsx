import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

export default function User() {
  return (
    <div className='mt-[20px]'>
      <Helmet>
        <title>Thông Tin Cá Nhân | Clone Shopee</title>
        <meta name='title' content='Đây là một dự án clone Shopee dùng cho mục đích học tập, và phi thương mại' />
        <meta name='description' content='Đây là một dự án clone Shopee dùng cho mục đích học tập, và phi thương mại' />
      </Helmet>
      <div className='grid-cols-12 container lg:grid'>
        <Sidebar />
        <div className='col-span-10 mt-4 lg:mt-0'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
