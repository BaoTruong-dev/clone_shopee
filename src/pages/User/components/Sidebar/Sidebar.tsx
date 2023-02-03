import { userInfo } from 'os'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { router } from 'src/constant/router'
import user_icon from '../../../../assets/profile.png'
import password_icon from '../../../../assets/password.png'
import cart_icon from '../../../../assets/bill.png'
import classNames from 'classnames'
export default function Sidebar() {
  const navigate = useNavigate()
  return (
    <aside>
      <div className='flex gap-4'>
        <img
          src='https://images.unsplash.com/photo-1675395576105-204d3d248430?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
          alt='avatar'
          className='border-x-gray-300object-cover h-14 w-14 shrink-0 overflow-hidden rounded-full border'
          onClick={() => navigate(router.user)}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role='button'
        />
        <Link to={router.user} className='text-sm'>
          <p className='mb-[4px] font-bold line-clamp-1'>baotruong2k</p>
          <div className='flex items-center'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            <div className='text-gray-500 '>Sửa Hồ Sơ</div>
          </div>
        </Link>
      </div>
      <div className='mt-[11px] mb-[40px] h-[1px] w-[90%] bg-gray-100'></div>
      <NavLink
        end
        to={router.user}
        className={({ isActive }) =>
          classNames('mb-4 flex items-center gap-3  hover:text-primary', {
            'text-primary': isActive
          })
        }
      >
        <img src={user_icon} alt='icon' className=' h-[20px] w-[20px] shrink-0 object-cover' />
        <p className=' text-sm font-medium '>Tài Khoản Của Tôi</p>
      </NavLink>
      <NavLink
        to={router.userChangePassword}
        className={({ isActive }) =>
          classNames('mb-4 flex items-center gap-3  hover:text-primary', {
            'text-primary': isActive
          })
        }
      >
        <img src={password_icon} alt='icon' className=' h-[20px] w-[20px] shrink-0 object-cover' />
        <p className=' text-sm font-medium '>Đổi Mật Khẩu</p>
      </NavLink>
      <NavLink
        to={router.userStatusCart}
        className={({ isActive }) =>
          classNames('mb-4 flex items-center gap-3  hover:text-primary', {
            'text-primary': isActive
          })
        }
      >
        <img src={cart_icon} alt='icon' className=' h-[20px] w-[20px] shrink-0 object-cover' />
        <p className=' text-sm font-medium '>Đơn Mua</p>
      </NavLink>
    </aside>
  )
}
