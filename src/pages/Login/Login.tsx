import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import Input from 'src/components/Input/Input'
import { AuthContext } from 'src/context/auth.context'
import schema from 'src/schema/schema'
interface FormInputs {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const { setUserInfo, setIsAuthenticated } = useContext(AuthContext)
  const {
    register,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<FormInputs>({
    resolver: yupResolver(schema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: FormInputs) => authApi.login(body)
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await trigger(['email', 'password'])
    const value = getValues()
    if (result) {
      loginMutation.mutate(value, {
        onSuccess: (data) => {
          setIsAuthenticated(true)
          if (data.data.data) setUserInfo(data.data.data.user)
          navigate('/')
        },
        onError: (error: any) => {
          toast.error(error.response.data.data.password)
        }
      })
    } else {
      console.log(value)
    }
  }
  return (
    <div className='min-h-[482px] w-[400px] rounded bg-white  py-[30px] px-[20px] shadow shadow-slate-300'>
      <form onSubmit={handleSubmit}>
        <h2 className='mb-[30px] text-[20px]'>Đăng nhập</h2>
        <Input placeHover='Email' {...register('email')} error={errors.email?.message} />
        <Input type='password' placeHover='Mật khẩu' {...register('password')} error={errors.password?.message} />
        <button className='mt-[40px] w-full rounded-[2px] bg-primary py-[10px] px-[15px] text-white'>Đăng nhập</button>
      </form>
      <div className='mt-5 text-center text-[14px]'>
        <span className='text-slate-600'>Bạn chưa có tài khoản?</span>
        <Link to='/register' className='ml-1 font-medium text-primary'>
          Đăng ký
        </Link>
      </div>
    </div>
  )
}
