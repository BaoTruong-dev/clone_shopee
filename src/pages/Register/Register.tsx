import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
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
    mutationFn: (body: Omit<FormInputs, 'confirmPassword'>) => authApi.register(body)
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
      registerMutation.mutate(_.omit(value, ['confirmPassword']), {
        onSuccess: (data) => {
          setIsAuthenticated(true)
          setUserInfo(data.data.data.user)
          navigate('/')
        },
        onError: (error: any) => {
          toast.error(error.response.data.data.email)
        }
      })
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
        <button className='mt-[40px] w-full rounded-[2px] bg-primary py-[10px] px-[15px] text-white'>Đăng ký</button>
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
