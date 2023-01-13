import React from 'react'

export default function Paginate() {
  return (
    <div className='mt-[40px] flex justify-center'>
      <div className='flex items-center justify-center gap-8 text-[#959595]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5 cursor-pointer'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
        <div className='cursor-pointer'>1</div>
        <div className='cursor-pointer'>1</div>
        <div className='cursor-pointer'>1</div>
        <div className='cursor-pointer'>1</div>
        <div className='cursor-pointer'>1</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5 cursor-pointer'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </div>
    </div>
  )
}
