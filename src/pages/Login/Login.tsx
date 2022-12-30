import React from 'react'
import Input from 'src/components/Input/Input'

export default function Login() {
  return (
    <div className='min-h-[482px] w-[400px] rounded bg-white  py-[30px] px-[20px] shadow shadow-slate-300'>
      <form>
        <h2 className='mb-[30px] text-[20px]'>Đăng nhập</h2>
        <Input placeHover='Email' />
        <Input type='password' placeHover='Mật khẩu' />
        <button className='mt-[40px] w-full rounded-[2px] bg-primary py-[10px] px-[15px] text-white'>Đăng nhập</button>
      </form>
    </div>
  )
}
