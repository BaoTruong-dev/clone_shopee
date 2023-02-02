import { useDeferredValue } from 'react'

interface QuantityProps {
  quantity: number
  max: number
  handleQuantity: (data: number) => void
  handleOnType: (data: number) => void
}

export default function QuantityController({ quantity, max, handleQuantity, handleOnType }: QuantityProps) {
  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    if (value >= max) {
      handleOnType(max)
    } else if (value <= 0) {
      handleOnType(1)
    } else {
      handleOnType(value)
    }
  }

  const handleIncreaseQuantity = () => {
    if (quantity < max) {
      handleQuantity(quantity + 1)
    }
  }
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      handleQuantity(quantity - 1)
    }
  }
  return (
    <div className='flex h-[32px] items-center'>
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
