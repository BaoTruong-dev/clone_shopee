import { Link } from 'react-router-dom'
import { Product } from 'src/types/products.type'
import { handlePercent } from 'src/utils/utils'
import Star from '../Star/Star'

export default function ProductItem({ product }: { product: Product }) {
  const percent = handlePercent(product.price_before_discount, product.price)
  return (
    <Link to={`/${product._id}`} className='relative hover:translate-y-[-2px]'>
      <div className='clip-path-tag absolute right-0 z-10 flex h-[40px] w-[40px] flex-col items-center justify-center bg-yellow-400  text-xs'>
        <div className=' text-primary'>{percent}</div>
        <div className='text-white'>GIẢM</div>
      </div>
      <div className='overflow-hidden rounded-sm shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt='thumbnail' className='absolute top-0 left-0 h-full w-[100%] object-cover' />
        </div>
        <div className='p-[10px]'>
          <p className='text-[12px] line-clamp-2'>{product.name}</p>
          <div className='my-[10px] flex items-center text-sm'>
            <p className='mr-[5px] text-[#929292] line-through'>
              ₫{new Intl.NumberFormat('de-DE').format(product.price_before_discount)}
            </p>
            <p className='text-primary'>₫{new Intl.NumberFormat('de-DE').format(product.price)}</p>
          </div>
          <div className='flex items-center'>
            <Star rating={product.rating} />
            <div className='ml-[5px] text-xs '>
              Đã bán <span>{Intl.NumberFormat('en', { notation: 'compact' }).format(product.sold).toLowerCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
