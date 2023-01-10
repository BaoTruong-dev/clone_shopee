import AsideFilter from './AsideFilter/AsideFilter'
import SortProducts from './SortProducts/SortProducts'

export default function Home() {
  return (
    <div className='pt-[20px]'>
      <div className='grid  grid-cols-12 gap-8 container'>
        <div className='col-span-3'>
          <AsideFilter />
        </div>
        <div className='col-span-9'>
          <div className='text-sm'>
            <SortProducts />
          </div>
        </div>
      </div>
    </div>
  )
}
