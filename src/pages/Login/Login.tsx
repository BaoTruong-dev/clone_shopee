import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import { router } from 'src/constant/router'
import Input from 'src/components/Input/Input'
import { AuthContext } from 'src/context/auth.context'
import schema from 'src/schema/schema'
import { useTranslation } from 'react-i18next'
interface FormInputs {
  email: string
  password: string
}

export default function Login() {
  const { t } = useTranslation(['home', 'form'])
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
    mutationFn: (body: FormInputs) => authApi.login(body),
    onSuccess: (data) => {
      setIsAuthenticated(true)
      if (data.data.data) setUserInfo(data.data.data.user)
      navigate(router.home)
    },
    onError: (error: any) => {
      toast.error(error.response.data.data.password)
    }
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await trigger(['email', 'password'])
    const value = getValues()
    if (result) {
      loginMutation.mutate(value)
    }
  }
  return (
    <div className='min-h-[482px] w-[400px] rounded bg-white  py-[30px] px-[20px] shadow shadow-slate-300'>
      <form onSubmit={handleSubmit}>
        <h2 className='mb-[30px] text-[20px]'>{t('header.login')}</h2>
        <Input placeHover='Email' {...register('email')} error={errors.email?.message} />
        <Input
          type='password'
          placeHover={t('form:password')}
          {...register('password')}
          error={errors.password?.message}
        />
        <button
          disabled={loginMutation.isLoading}
          className={`mt-[40px] w-full rounded-[2px] bg-primary py-[10px] px-[15px] text-white hover:bg-opacity-[0.8] ${
            loginMutation.isLoading ? 'bg-opacity-[0.8]' : ''
          }`}
        >
          {t('header.login')}
        </button>
      </form>
      <div className='mt-5 text-center text-[14px]'>
        <span className='text-slate-600'>{t('header.no-account')}?</span>
        <Link to='/register' className='ml-1 font-medium text-primary'>
          {t('header.register')}
        </Link>
      </div>
    </div>
  )
}
