import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import _ from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import { router } from 'src/constant/router'
import Input from 'src/components/Input/Input'
import { AuthContext } from 'src/context/auth.context'
import schema from 'src/schema/schema'
import { compareValue } from 'src/utils/utils'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
interface FormInputs {
  email: string
  password: string
  confirmPassword: string
}

export default function Register() {
  const { t } = useTranslation(['home', 'form'])
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
      <Helmet>
        <title>{t('header.register')} | Clone Shopee</title>
        <meta name='title' content='Đây là một dự án clone Shopee dùng cho mục đích học tập, và phi thương mại' />
        <meta name='description' content='Đây là một dự án clone Shopee dùng cho mục đích học tập, và phi thương mại' />
      </Helmet>
      <form onSubmit={handleSubmit}>
        <h2 className='mb-[30px] text-[20px]'>{t('header.register')}</h2>
        <Input placeHover='Email' {...register('email')} error={errors.email?.message} />
        <Input
          type='password'
          placeHover={t('form:password')}
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          type='password'
          placeHover={t('form:confirm-password')}
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <button
          disabled={registerMutation.isLoading}
          className={`mt-[40px] flex w-full items-center justify-center rounded-[2px] bg-primary py-[10px] px-[15px] text-white hover:bg-opacity-[0.8] ${
            registerMutation.isLoading ? 'bg-opacity-[0.8]' : ''
          }`}
        >
          {t('header.register')}
        </button>
      </form>
      <div className='mt-5 text-center text-[14px]'>
        <span className='text-slate-600'>{t('header.have-account')}?</span>
        <Link to='/login' className='ml-1 font-medium text-primary'>
          {t('header.login')}
        </Link>
      </div>
    </div>
  )
}
