import { Link } from 'react-router-dom'
import Star from '../Star/Star'

export default function ProductItem() {
  return (
    <Link to='#'>
      <div className='overflow-hidden rounded-sm shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src='https://images.unsplash.com/photo-1671725501632-3980b640f420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80'
            alt='thumbnail'
            className='absolute top-0 left-0 h-full w-[100%] object-cover'
          />
        </div>
        <div className='p-[10px]'>
          <p className='text-[12px] line-clamp-2'>QUẦN SHORT KAKI NAM CO GIÃN CAO CẤP BẢNG MÀU PASTEL CỰC HOT</p>
          <div className='my-[10px] flex items-center text-sm'>
            <p className='mr-[5px] text-grey text-slate-500 line-through  '>₫198.000</p>
            <p className='text-primary'>₫198.000</p>
          </div>
          <div className='flex items-center'>
            <Star />
            <div className='ml-[5px] text-xs '>
              Đã bán <span>5,7k</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
