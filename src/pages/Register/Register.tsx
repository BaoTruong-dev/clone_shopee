import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import { router } from 'src/components/constant/router'
import Input from 'src/components/Input/Input'
import { AuthContext } from 'src/context/auth.context'
import schema from 'src/schema/schema'
import compareValue from 'src/utils/compareValue'
interface FormInputs {
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const navigate = useNavigate()
  const { setUserInfo, setIsAuthenticated } = useContext(AuthContext)
  const {
    register,
    trigger,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: yupResolver(schema)
  })
  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormInputs, 'confirmPassword'>) => authApi.register(body),
    onSuccess: (data) => {
      setIsAuthenticated(true)
      if (data.data.data) setUserInfo(data.data.data.user)
      navigate(router.home)
    },
    onError: (error: any) => {
      toast.error(error.response.data.data.email)
    }
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await trigger(['email', 'password', 'confirmPassword'])
    const value = getValues()
    let flag = true
    if (value.password && value.confirmPassword) {
      if (!compareValue(value.password, value.confirmPassword)) {
        setError('confirmPassword', { message: 'Nhập lại mật khẩu chưa chính xác!' })
        flag = false
      } else {
        flag = true
      }
    }
    if (result && flag) {
      registerMutation.mutate(_.omit(value, ['confirmPassword']))
    }
  }
  return (
    <div className='min-h-[482px] w-[400px] rounded bg-white  py-[30px] px-[20px] shadow shadow-slate-300'>
      <form onSubmit={handleSubmit}>
        <h2 className='mb-[30px] text-[20px]'>Đăng ký</h2>
        <Input placeHover='Email' {...register('email')} error={errors.email?.message} />
        <Input type='password' placeHover='Mật khẩu' {...register('password')} error={errors.password?.message} />
        <Input
          type='password'
          placeHover='Nhập lại khẩu'
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <button
          disabled={registerMutation.isLoading}
          className={`mt-[40px] flex w-full items-center justify-center rounded-[2px] bg-primary py-[10px] px-[15px] text-white hover:bg-opacity-[0.8] ${
            registerMutation.isLoading ? 'bg-opacity-[0.8]' : ''
          }`}
        >
          {/* <div role='status'>
            <svg
              aria-hidden='true'
              className='fill- mr-2 h-6 w-6 animate-spin fill-white text-gray-300'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          </div> */}
          Đăng ký
        </button>
      </form>
      <div className='mt-5 text-center text-[14px]'>
        <span className='text-slate-600'>Bạn đã có tài khoản?</span>
        <Link to='/login' className='ml-1 font-medium text-primary'>
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}
