import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { log } from 'console'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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

export type DataUpdate = Pick<UserSchemaType, 'address' | 'date_of_birth' | 'name' | 'phone' | 'avatar'>
const schema = userSchema.omit(['password', 'new_password', 'confirm_new_password'])
export default function Profile() {
  const { t } = useTranslation('profile')
  const { t: form } = useTranslation('form')
  const { userInfo, setUserInfo, avatarFile, setAvatarFile } = useContext(AuthContext)
  const avatarRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty }
  } = useForm<DataUpdate>({
    defaultValues: {
      address: userInfo?.address || '',
      name: userInfo?.name || '',
      phone: userInfo?.phone || '',
      avatar: userInfo?.avatar || '',
      date_of_birth: userInfo?.date_of_birth || new Date(1990, 0, 1)
    },
    resolver: yupResolver(schema)
  })

  const updateUserMutation = useMutation({
    mutationFn: (data: DataUpdate) => {
      return userApi.updateUser(data)
    },
    onSuccess: (data) => {
      saveUserInfoLS(data.data.data)
      setUserInfo(data.data.data)
      toast.success('Cập nhật thông tin thành công!')
    }
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: (data: FormData) => {
      return userApi.uploadAvatar(data)
    }
  })
  const handleFormSubmit = async (data: DataUpdate) => {
    if (isDirty) {
      setUserInfo(data as User)
      if (avatarFile.file) {
        const formData = new FormData()
        formData.append('image', avatarFile.file)
        const respond = await uploadAvatarMutation.mutateAsync(formData)
        setAvatarFile({
          ...avatarFile,
          file: undefined
        })
        setUserInfo((prev) => {
          return {
            ...prev,
            avatar: respond.data.data
          }
        })
        return updateUserMutation.mutate({
          ...data,
          avatar: respond.data.data
        })
      } else {
        return updateUserMutation.mutate(data)
      }
    }
  }
  useEffect(() => {
    if (avatarFile.file) {
      setValue('avatar', '', { shouldDirty: true })
    }
  }, [avatarFile, setValue])
  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      setAvatarFile({
        file,
        preview: URL.createObjectURL(file)
      })
    }

    e.currentTarget.value = ''
  }
  return (
    <div className='rounded-sm p-[20px] text-sm shadow-md'>
      <div className='h-[68px]'>
        <p className='text-[18px] font-medium'>{t('info-page.title')}</p>
        <p className='mt-[10px] text-sm text-gray-600'>{t('info-page.description')}</p>
      </div>
      <div className='mb-[40px] h-[1px] w-full bg-gray-100'></div>
      <form className='flex gap-[50px]' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='flex-1'>
          <div className='mb-[30px] flex gap-6'>
            <p className='w-[20%] text-right text-gray-500'>Email</p>
            <p className='flex-1'>{userInfo?.email}</p>
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[20%] text-right text-gray-500'>{form('name')}</p>
            <Input className='!mb-0 flex-1' {...register('name')} error={errors.name?.message} />
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[20%] text-right text-gray-500'>{form('phone-number')}</p>
            <Input className='!mb-0 flex-1' {...register('phone')} error={errors.phone?.message} />
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='mb-[24px] w-[20%] text-right text-gray-500'>{form('address')}</p>
            <Input className='!mb-0 flex-1' {...register('address')} error={errors.address?.message} />
          </div>
          <div className='mb-[10px] flex items-center gap-6'>
            <p className='w-[20%] text-right text-gray-500'>{form('date-of-birth')}</p>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field: { onChange, value } }) => (
                <DateSelect
                  value={value as unknown as string}
                  onChange={onChange} // send value to hook form
                />
              )}
            />
          </div>
          <div className='my-[30px] flex items-center gap-6'>
            <p className='w-[20%]'></p>
            <div className='flex-grow'>
              <MainButton className={classNames({ 'bg-primary/70': !isDirty })}>{t('info-page.button')}</MainButton>
            </div>
          </div>
        </div>
        <div className='flex w-[30%] flex-col items-center border-l-[1px] border-stone-100 pl-[50px]'>
          <div className='h-[100px] w-[100px] overflow-hidden rounded-full'>
            <img
              src={avatarFile.preview || getUrlAvatar(userInfo?.avatar)}
              alt='avatar'
              className='h-full w-full object-cover'
            />
          </div>
          <input type='file' hidden ref={avatarRef} onChange={handleChangeAvatar} accept='.png, .jpg, .jpeg' />
          <button
            className='my-[20px] border border-stone-200 px-[20px] py-[10px]'
            onClick={() => avatarRef.current?.click()}
            type='button'
          >
            {t('info-page.select-image')}
          </button>
          <p className='text-center text-sm text-[#999999]'>{t('info-page.limited-file')}</p>
        </div>
      </form>
    </div>
  )
}
