import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { productApi } from 'src/apis/product.api'
import Paginate from 'src/components/Paginate/Paginate'
import ProductItem from 'src/components/ProductItem/ProductItem'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductParams } from 'src/types/products.type'
import AsideFilter from './AsideFilter/AsideFilter'
import SortProducts from './SortProducts/SortProducts'

export default function Home() {
  const queryString = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: () => {
      return productApi.getProducts(queryString as ProductParams)
    }
  })

  return (
    <div className='pt-[20px]'>
      <div className='grid  grid-cols-12 gap-8 container'>
        <div className='col-span-3'>
          <AsideFilter />
        </div>
        <div className='col-span-9'>
          <div className='bg-grey py-[10px] px-[20px] text-sm'>
            <SortProducts />
          </div>
          <div className='mt-[10px]  grid grid-cols-4 gap-4 p-[5px]'>
            {productsData?.data?.data?.products.map((product) => {
              return <ProductItem key={product._id} product={product} />
            })}
          </div>
          <Paginate />
        </div>
      </div>
    </div>
  )
}
