import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import category from 'src/apis/category.api'
import { productApi } from 'src/apis/product.api'
import Paginate from 'src/components/Paginate/Paginate'
import ProductItem from 'src/components/ProductItem/ProductItem'
import useQueryConfig, { ConfigURL } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'
import { ProductURL } from 'src/types/products.type'
import empty_box from '../../assets/empty-box.png'
import AsideFilter from './AsideFilter/AsideFilter'
import SortProducts from './SortProducts/SortProducts'
export default function Home() {
  const queryConfig: ConfigURL = useQueryConfig()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductURL)
    },
    staleTime: 30 * 60 * 1000,
    keepPreviousData: true
  })
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return category.getCategories()
    },
    staleTime: 30 * 60 * 1000,
    keepPreviousData: true
  })
  if (!productsData) return null
  return (
    <div className='!pt-[20px] container'>
      <Helmet>
        <title>Trang Chủ | Shopee Clone</title>
        <meta name='title' content='Đây là một dự án clone Shopee dùng cho mục đích học tập, và phi thương mại' />
        <meta name='description' content='Đây là một dự án clone Shopee dùng cho mục đích học tập, và phi thương mại' />
      </Helmet>
      {productsData.data.data.products.length > 0 ? (
        <div className='gap-8 sm:grid lg:grid-cols-12 '>
          <div className='lg:col-span-3'>
            <AsideFilter queryConfig={queryConfig} categories={categoryData?.data.data as Category[]} />
          </div>
          <div className='lg:col-span-9'>
            <div className='bg-grey py-[10px] px-[20px] text-sm'>
              <SortProducts
                queryConfig={queryConfig}
                pageSize={productsData?.data.data?.pagination.page_size as number}
              />
            </div>
            <div className='mt-[10px] grid gap-4 p-[5px] sm:grid-cols-2 lg:grid-cols-4'>
              {productsData?.data?.data?.products.map((product) => {
                return <ProductItem key={product._id} product={product} />
              })}
            </div>
            <Paginate queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size as number} />
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
