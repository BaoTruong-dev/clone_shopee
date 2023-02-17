import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input/Input'
import MainButton from 'src/components/MainButton/MainButton'
import { userSchema, UserSchemaType } from 'src/schema/schema'
export type PasswordUpdate = Pick<UserSchemaType, 'password' | 'new_password' | 'confirm_new_password'>
const schemaPassword = userSchema.omit(['address', 'date_of_birth', 'name', 'phone', 'avatar'])

export default function ChangePassword() {
  const { t } = useTranslation('profile')
  const { t: form } = useTranslation('form')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordUpdate>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_new_password: ''
    },
    resolver: yupResolver(schemaPassword)
  })
  const updateUserMutation = useMutation({
    mutationFn: (data: PasswordUpdate) => userApi.updateUser(data),
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công!')
    },
    onError: (error: any) => {
      toast.error(error.response.data.data.password)
    }
  })
  const onSubmit = (data: PasswordUpdate) => {
    updateUserMutation.mutate(data)
  }

  return (
    <div className='rounded-sm p-[20px] text-sm shadow-md'>
      <div className='h-[68px]'>
        <p className='text-[18px] font-medium'>{t('password-page.title')}</p>
        <p className='mt-[10px] text-sm text-gray-600'>{t('password-page.description')}</p>
      </div>
      <div className='mb-[40px] h-[1px] w-full bg-gray-100'></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-1'>
          <div className='mb-[10px] gap-6 md:flex md:items-center'>
            <p className='mb-[24px] text-gray-500 md:w-[20%] md:text-right'>{form('current-password')}</p>
            <Input
              className='!mb-0 w-full md:w-[60%]'
              type='password'
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          <div className='mb-[10px] gap-6 md:flex md:items-center'>
            <p className='mb-[24px] text-left text-gray-500 md:w-[20%] md:text-right'>{form('new-password')}</p>
            <Input
              className='!mb-0 w-full md:w-[60%]'
              type='password'
              {...register('new_password')}
              error={errors.new_password?.message}
            />
          </div>
          <div className='mb-[10px] gap-6 md:flex md:items-center'>
            <p className='mb-[24px] text-gray-500 md:w-[20%] md:text-right'>{form('confirm-password')}</p>
            <Input
              className='!mb-0 w-full md:w-[60%]'
              type='password'
              {...register('confirm_new_password')}
              error={errors.confirm_new_password?.message}
            />
          </div>
          <div className='my-[30px] gap-6 md:flex md:items-center'>
            <p className='md:w-[20%]'></p>
            <div className='flex-grow'>
              <MainButton className={classNames({ 'bg-primary/70': _.values(errors).length > 0 })}>
                {t('password-page.button')}
              </MainButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
