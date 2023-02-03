import Input from 'src/components/Input/Input'
import MainButton from 'src/components/MainButton/MainButton'

export default function Profile() {
  return (
    <div className='text-sm'>
      <div className='h-[68px]'>
        <p className='text-[18px] font-medium'>Hồ Sơ Của Tôi</p>
        <p className='mt-[10px] text-sm text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className='mb-[40px] h-[1px] w-full bg-gray-100'></div>
      <form className='flex gap-[50px]'>
        <div className='flex-1'>
          <div className='mb-[30px] flex gap-6'>
            <p className='w-[15%] text-right text-gray-500'>Email</p>
            <p className='flex-1'>baotruong2k</p>
          </div>
          <div className='mb-[30px] flex items-center gap-6'>
            <p className='w-[15%] text-right text-gray-500'>Tên</p>
            <Input hiddenError className='!mb-0 flex-1' />
          </div>
          <div className='mb-[30px] flex items-center gap-6'>
            <p className='w-[15%] text-right text-gray-500'>Số Điện Thoại</p>
            <Input hiddenError className='!mb-0 flex-1' />
          </div>
          <div className='mb-[30px] flex items-center gap-6'>
            <p className='w-[15%] text-right text-gray-500'>Địa Chỉ</p>
            <Input hiddenError className='!mb-0 flex-1' />
          </div>
          <div className='mb-[30px] flex items-center gap-6'>
            <p className='w-[15%] text-right text-gray-500'>Ngày Sinh</p>
            <Input hiddenError className='!mb-0 flex-1' />
          </div>
          <div className='mb-[30px] flex items-center gap-6'>
            <p className='w-[15%]'></p>
            <MainButton>Lưu</MainButton>
          </div>
        </div>
        <div className='w-[30%]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, doloremque! In culpa nemo, distinctio
          dolorum quae rem expedita asperiores modi et laborum quisquam, esse quibusdam porro maiores nisi dolorem
          praesentium!
        </div>
      </form>
    </div>
  )
}
