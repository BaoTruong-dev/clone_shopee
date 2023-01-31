import { useQuery } from '@tanstack/react-query'
import category from 'src/apis/category.api'
import { productApi } from 'src/apis/product.api'
import Paginate from 'src/components/Paginate/Paginate'
import ProductItem from 'src/components/ProductItem/ProductItem'
import useQueryConfig, { ConfigURL } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'
import { ProductURL } from 'src/types/products.type'
import AsideFilter from './AsideFilter/AsideFilter'
import SortProducts from './SortProducts/SortProducts'
import empty_box from '../../assets/empty-box.png'
export default function Home() {
  const queryConfig: ConfigURL = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductURL)
    },
    keepPreviousData: true
  })
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return category.getCategories()
    }
  })
  if (!productsData) return null
  return (
    <div className='pt-[20px]'>
      {productsData.data.data.products.length > 0 ? (
        <div>
          <div className='grid  grid-cols-12 gap-8 container'>
            <div className='col-span-3'>
              <AsideFilter queryConfig={queryConfig} categories={categoryData?.data.data as Category[]} />
            </div>
            <div className='col-span-9'>
              <div className='bg-grey py-[10px] px-[20px] text-sm'>
                <SortProducts
                  queryConfig={queryConfig}
                  pageSize={productsData?.data.data?.pagination.page_size as number}
                />
              </div>
              <div className='mt-[10px]  grid grid-cols-4 gap-4 p-[5px]'>
                {productsData?.data?.data?.products.map((product) => {
                  return <ProductItem key={product._id} product={product} />
                })}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size as number} />
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-[100px] flex flex-col items-center'>
          <img src={empty_box} alt='empty_box' width='200' />
          <p className='mt-[40px]'>Không tìm thấy sản phẩm phù hợp</p>
        </div>
      )}
    </div>
  )
}
