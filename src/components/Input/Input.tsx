import React from 'react'

interface InputProps {
  placeHover?: string
  type?: React.HTMLInputTypeAttribute
  label?: string
  error?: string
}

export default function Input({ placeHover, type = 'text', label, error }: InputProps) {
  return (
    <label>
      {label && <div>{label}</div>}
      <input
        type={type}
        placeholder={placeHover}
        className='mb-[25px] w-full rounded-[2px] border py-[10px] px-[15px] text-[14px] focus:outline-gray-400'
      />
      {error}
    </label>
  )
}
