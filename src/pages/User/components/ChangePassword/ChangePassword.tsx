import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input/Input'
import MainButton from 'src/components/MainButton/MainButton'
import { userSchema, UserSchemaType } from 'src/schema/schema'
export type PasswordUpdate = Pick<UserSchemaType, 'password' | 'new_password' | 'confirm_new_password'>
const schemaPassword = userSchema.omit(['address', 'date_of_birth', 'name', 'phone', 'avatar'])

export default function ChangePassword() {
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
    }
  })
  const onSubmit = (data: PasswordUpdate) => {
    updateUserMutation.mutate(data)
  }

  return (
    <div className='rounded-sm p-[20px] text-sm shadow-md'>
      <div className='h-[68px]'>
        <p className='text-[18px] font-medium'>Đổi Mật Khẩu</p>
        <p className='mt-[10px] text-sm text-gray-600'>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <div className='mb-[40px] h-[1px] w-full bg-gray-100'></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex-1'>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[15%] text-right text-gray-500'>Mật Khẩu Hiện Tại</p>
            <Input
              className='!mb-0 w-[40%]'
              type='password'
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[15%] text-right text-gray-500'>Mật Khẩu Mới</p>
            <Input
              className='!mb-0 w-[40%]'
              type='password'
              {...register('new_password')}
              error={errors.new_password?.message}
            />
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[15%] text-right text-gray-500'>Xác Nhận Mật Khẩu</p>
            <Input
              className='!mb-0 w-[40%]'
              type='password'
              {...register('confirm_new_password')}
              error={errors.confirm_new_password?.message}
            />
          </div>
          <div className='my-[30px] flex items-center gap-6'>
            <p className='w-[15%]'></p>
            <div className='flex-grow'>
              <MainButton className={classNames({ 'bg-primary/70': _.values(errors).length > 0 })}>Xác Nhận</MainButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
