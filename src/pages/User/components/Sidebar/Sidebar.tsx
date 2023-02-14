import { userInfo } from 'os'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { router } from 'src/constant/router'
import user_icon from '../../../../assets/profile.png'
import password_icon from '../../../../assets/password.png'
import cart_icon from '../../../../assets/bill.png'
import classNames from 'classnames'
import { useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { getUrlAvatar } from 'src/utils/utils'
import { useContext } from 'react'
import { AuthContext } from 'src/context/auth.context'
import { useTranslation } from 'react-i18next'
export default function Sidebar() {
  const { t } = useTranslation('profile')
  const navigate = useNavigate()
  const { userInfo } = useContext(AuthContext)

  return (
    <aside className='col-span-2 pt-[20px]'>
      <div className='flex gap-3'>
        <img
          src={getUrlAvatar(userInfo?.avatar)}
          alt='avatar'
          className='border-x-gray-300object-cover h-14 w-14 shrink-0 overflow-hidden rounded-full border'
          onClick={() => navigate(router.user)}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role='button'
        />
        <Link to={router.user} className='w-[60%]'>
          <p className='truncate text-sm font-bold'>{userInfo?.email}</p>
          <div className='flex items-center'>
            <svg width={12} height={12} viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            <div className='ml-[4px] text-sm text-gray-500'>{t('edit-profile')}</div>
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
        <p className=' text-sm font-medium '>{t('my-account')}</p>
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
        <p className=' text-sm font-medium '>{t('change-password')}</p>
      </NavLink>
      <NavLink
        to={`${router.userStatusCart}?status=0`}
        className={({ isActive }) =>
          classNames('mb-4 flex items-center gap-3  hover:text-primary', {
            'text-primary': isActive
          })
        }
      >
        <img src={cart_icon} alt='icon' className=' h-[20px] w-[20px] shrink-0 object-cover' />
        <p className=' text-sm font-medium '>{t('my-purchase')}</p>
      </NavLink>
    </aside>
  )
}
