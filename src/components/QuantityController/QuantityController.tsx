import { useState } from 'react'

interface QuantityProps {
  quantity: number
  setQuantity: React.Dispatch<React.SetStateAction<number>>
  max?: number
}

export default function QuantityController({ quantity, max, setQuantity }: QuantityProps) {
  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    if (max) {
      if (value > max) {
        setQuantity(max)
        return
      }
    }
    if (value === 0) {
      setQuantity(1)
      return
    }
    setQuantity(value)
  }
  const handleIncreaseQuantity = () => {
    if (max) {
      if (quantity < max) {
        setQuantity((prev) => prev + 1)
      }
    } else {
      setQuantity((prev) => prev + 1)
    }
  }
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }
  return (
    <div className='flex h-full items-center'>
      <button className='h-full border border-black/10 p-[5px]' onClick={handleDecreaseQuantity}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
        </svg>
      </button>
      <input
        type='number'
        className=' h-full w-14 max-w-fit border border-r-0 border-l-0 border-black/10 px-[10px] text-center outline-none'
        value={quantity}
        onChange={handleChangeInput}
      />
      <button className='h-full  border border-black/10 p-[5px]' onClick={handleIncreaseQuantity}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v12m6-6H6' />
        </svg>
      </button>
    </div>
  )
}
