import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { productApi } from 'src/apis/product.api'
import Paginate from 'src/components/Paginate/Paginate'
import ProductItem from 'src/components/ProductItem/ProductItem'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductURL } from 'src/types/products.type'
import AsideFilter from './AsideFilter/AsideFilter'
import SortProducts from './SortProducts/SortProducts'
export type ConfigURL = {
  [key in keyof ProductURL]: string
}

export default function Home() {
  const queryString: ConfigURL = useQueryConfig()
  const queryConfig: ConfigURL = _.omitBy(
    {
      page: queryString.page || '1',
      limit: queryString.limit,
      order: queryString.order,
      sort_by: queryString.sort_by,
      category: queryString.category,
      exclude: queryString.exclude,
      rating_filter: queryString.rating_filter,
      price_max: queryString.price_max,
      price_min: queryString.price_min,
      name: queryString.name
    },
    _.isUndefined
  )

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductURL)
    },
    keepPreviousData: true
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
          <Paginate queryConfig={queryConfig} pageSize={productsData?.data.data?.pagination.page_size as number} />
        </div>
      </div>
    </div>
  )
}
