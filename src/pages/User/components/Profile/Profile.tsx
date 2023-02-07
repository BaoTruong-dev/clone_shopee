import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import userApi from 'src/apis/user.api'
import Input from 'src/components/Input/Input'
import MainButton from 'src/components/MainButton/MainButton'
import { AuthContext } from 'src/context/auth.context'
import { userSchema, UserSchemaType } from 'src/schema/schema'
import { User } from 'src/types/user.type'
import { saveUserInfoLS } from 'src/utils/auth.ls'
import { getUrlAvatar } from 'src/utils/utils'
import DateSelect from '../DateSelect/DateSelect'

export type dataUpdate = Pick<UserSchemaType, 'address' | 'date_of_birth' | 'name' | 'phone' | 'avatar'>
const schema = userSchema.omit(['password', 'new_password', 'confirm_new_password'])
export default function Profile() {
  const { userInfo, setUserInfo } = useContext(AuthContext)
  const avatarRef = useRef<HTMLInputElement>(null)
  const [avatarFile, setAvatarFile] = useState<File>()
  const previewAvatar = useMemo(() => {
    return avatarFile ? URL.createObjectURL(avatarFile) : ''
  }, [avatarFile])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty }
  } = useForm<dataUpdate>({
    defaultValues: {
      address: userInfo?.address || '',
      name: userInfo?.name || '',
      phone: userInfo?.phone || '',
      avatar: userInfo?.phone || '',
      date_of_birth: userInfo?.date_of_birth || new Date(1990, 0, 1)
    },
    resolver: yupResolver(schema)
  })

  const updateUserMutation = useMutation({
    mutationFn: (data: dataUpdate) => {
      return userApi.updateUser(data)
    },
    onSuccess: (data) => {
      saveUserInfoLS(data.data.data)
      toast.success('Cập nhật thông tin thành công!')
    }
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: (data: FormData) => {
      return userApi.uploadAvatar(data)
    }
  })
  const handleFormSubmit = async (data: dataUpdate) => {
    if (isDirty) {
      setUserInfo(data as User)
      if (avatarFile) {
        const formData = new FormData()
        formData.append('avatar', avatarFile)
        const respond = await uploadAvatarMutation.mutateAsync(formData)
        console.log(respond)

        // setValue('avatar', respond.data.data)
      }
      // updateUserMutation.mutate(data)
    }
  }
  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    setAvatarFile(file)
    e.currentTarget.value = ''
  }
  return (
    <div className='text-sm'>
      <div className='h-[68px]'>
        <p className='text-[18px] font-medium'>Hồ Sơ Của Tôi</p>
        <p className='mt-[10px] text-sm text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className='mb-[40px] h-[1px] w-full bg-gray-100'></div>
      <form className='flex gap-[50px]' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='flex-1'>
          <div className='mb-[30px] flex gap-6'>
            <p className='w-[15%] text-right text-gray-500'>Email</p>
            <p className='flex-1'>baotruong2k</p>
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[15%] text-right text-gray-500'>Tên</p>
            <Input className='!mb-0 flex-1' {...register('name')} error={errors.name?.message} />
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[15%] text-right text-gray-500'>Số Điện Thoại</p>
            <Input className='!mb-0 flex-1' {...register('phone')} error={errors.phone?.message} />
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[15%] text-right text-gray-500'>Địa Chỉ</p>
            <Input className='!mb-0 flex-1' {...register('address')} error={errors.address?.message} />
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='w-[15%] text-right text-gray-500'>Ngày Sinh</p>
            <DateSelect value={userInfo?.date_of_birth as unknown as string} />
          </div>
          <div className='my-[30px] flex items-center gap-6'>
            <p className='w-[15%]'></p>
            <div className='flex-grow'>
              <MainButton className={classNames({ 'bg-primary/70': !isDirty })}>Lưu</MainButton>
            </div>
          </div>
        </div>
        <div className='flex w-[30%] flex-col items-center border-l-[1px] border-stone-100 pl-[50px]'>
          <div className='h-[100px] w-[100px] overflow-hidden rounded-full'>
            <img
              src={previewAvatar || getUrlAvatar(userInfo?.avatar)}
              alt='avatar'
              className='h-full w-full object-cover'
            />
          </div>
          <input type='file' hidden ref={avatarRef} onChange={handleChangeAvatar} accept='.png, .jpg, .jpeg' />
          <button
            className='my-[20px] border border-stone-200 px-[20px] py-[10px]'
            onClick={() => avatarRef.current?.click()}
          >
            Chọn Ảnh
          </button>
          <p className='text-center text-sm text-[#999999]'>Dụng lượng file tối đa 1 MB Định dạng: .JPEG, .PNG</p>
        </div>
      </form>
    </div>
  )
}
