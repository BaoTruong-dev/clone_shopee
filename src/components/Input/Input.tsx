import classNames from 'classnames'
import React, { forwardRef } from 'react'
interface InputProps {
  placeHover?: string
  type?: React.HTMLInputTypeAttribute
  label?: string
  error?: string
  name?: string
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void
  hiddenError?: boolean
  className?: string
}

function Input(
  { placeHover, type = 'text', label, error, hiddenError, className, ...rest }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) {
  return (
    <label className={`mb-[10px] block ${className}`}>
      {label && <div>{label}</div>}
      <input
        {...rest}
        type={type}
        ref={ref}
        placeholder={placeHover}
        className='w-full rounded-[2px] border py-[10px] px-[15px] text-[14px] focus:outline-gray-400'
      />
      <p className={classNames('min-h-[22px] text-[12px] text-red-600', { hidden: hiddenError })}>{error}</p>
    </label>
  )
}

export default forwardRef(Input)
