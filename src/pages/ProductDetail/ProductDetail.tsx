import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { productApi } from 'src/apis/product.api'
import { purchasesApi } from 'src/apis/purchases.api'
import MainButton from 'src/components/MainButton/MainButton'
import ProductItem from 'src/components/ProductItem/ProductItem'
import QuantityController from 'src/components/QuantityController/QuantityController'
import Star from 'src/components/Star/Star'
import { AuthContext } from 'src/context/auth.context'
import { PurchasesAddItem } from 'src/types/purchases.type'
import { handlePercent } from 'src/utils/utils'
export default function ProductDetail() {
  const { t } = useTranslation('product')
  const [quantity, setQuantity] = useState<number>(1)
  const [slideRange, setSlideRange] = useState<number[]>([0, 5])
  const [activeImage, setActiveImage] = useState<string>('')
  const imageZoomRef = useRef<HTMLImageElement>(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)
  const { id } = useParams()
  const _id = id?.split(',')[1] as string
  const { data: productInfo } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      return productApi.getProductDetail(_id)
    },
    onError: () => {
      navigate('/')
    },
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })
  const product = productInfo?.data.data
  const { data: productsRelative } = useQuery({
    queryKey: ['product_relative', product?.category._id, id],
    queryFn: () => {
      return productApi.getProducts({ category: product?.category._id })
    },
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })
  const addToCartMutation = useMutation({
    mutationFn: (formData: PurchasesAddItem) => {
      return purchasesApi.addToCart(formData)
    },
    onSuccess: () => {
      toast.success('Đã thêm vào giỏ hàng')
      queryClient.removeQueries({ queryKey: ['purchases', { status: -1 }] })
    },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (product) {
      setActiveImage(product?.images[0])
    }
  }, [product])
  const handleAddToCard = (quantity: number, id: string) => {
    if (isAuthenticated) {
      return addToCartMutation.mutate(
        {
          product_id: id,
          buy_count: quantity
        }
        // {
        //   onSuccess: () => {
        //     toast.success('Đã thêm vào giỏ hàng')
        //   }
        // }
      )
    } else {
      navigate('/login')
    }
  }
  const handleBuyNow = (quantity: number, id: string) => {
    if (isAuthenticated) {
      return addToCartMutation.mutate(
        {
          product_id: id,
          buy_count: quantity
        },
        {
          onSuccess: () => {
            navigate('/cart', { state: id })
          }
        }
      )
    } else {
      navigate('/login')
    }
  }
  const handleQuantity = (data: number) => {
    setQuantity(data)
  }

  const handleHoverZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const image = imageZoomRef.current as HTMLImageElement
    const x = e.clientX - e.currentTarget.offsetLeft
    const y = e.clientY - e.currentTarget.offsetTop
    image.style.transformOrigin = `${x}px ${y}px`
    image.style.transform = 'scale(2)'
  }
  const handleRemoveHoverZoom = () => {
    const image = imageZoomRef.current as HTMLImageElement

    image.style.transform = 'scale(1)'
  }
  const handleNextSlideImage = () => {
    if (product && slideRange[1] < product.images.length) {
      setSlideRange((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const handlePrevSlideImage = () => {
    if (product && slideRange[0] > 0) {
      setSlideRange((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleHoverActiveImage = (url: string) => {
    setActiveImage(url)
  }
  const percent = product && handlePercent(product.price_before_discount, product.price)

  if (!product) return null
  return (
    <div className='pt-[40px]'>
      <Helmet>
        <title>{product.name}</title>
        <meta name='title' content={product.name} />
        <meta name='description' content={product.name} />
      </Helmet>
      <div className='container'>
        <div className='grid-cols-12 gap-6 p-[20px] shadow-md sm:grid'>
          <div className='col-span-5'>
            <div
              className='relative w-full cursor-zoom-in overflow-hidden  pb-[100%]'
              onMouseMove={handleHoverZoom}
              onMouseLeave={handleRemoveHoverZoom}
            >
              <img ref={imageZoomRef} src={activeImage} alt={product.name} className='absolute inset-0 object-cover' />
            </div>
            <div className='relative mt-[15px] grid grid-cols-5 gap-4'>
              <button
                className='absolute top-[50%] left-0 z-20 translate-y-[-50%] cursor-pointer'
                onClick={handlePrevSlideImage}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='#ee4d2d'
                  className='h-7 w-7'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </button>
              {product.images.slice(...slideRange).map((e) => {
                const isActive = e === activeImage
                return (
                  <div
                    className='relative col-span-1 w-full pb-[100%]'
                    key={e}
                    onMouseEnter={() => handleHoverActiveImage(e)}
                  >
                    <div
                      className={classNames('absolute inset-0 z-10 ', { 'border-2 border-primary': isActive })}
                    ></div>
                    <img src={e} alt={product.name} className='absolute inset-0 object-cover' />
                  </div>
                )
              })}
              <button
                className='absolute top-[50%] right-0 z-20 translate-y-[-50%] cursor-pointer'
                onClick={handleNextSlideImage}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2.5}
                  stroke='#ee4d2d'
                  className='h-7 w-7'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </button>
            </div>
          </div>
          <div className='col-span-7 mt-6 sm:mt-0'>
            <h1 className='text-[20px] font-bold'>{product.name}</h1>
            <div className='mt-[10px]'>
              <div className='flex flex-col gap-2 sm:flex-row sm:gap-0'>
                <div className='flex'>
                  <div className='mr-[10px] text-primary underline underline-offset-4'>{product.rating.toFixed(1)}</div>
                  <Star rating={product.rating} size='!h-4 !w-4' color='#ee4d2d' transparent={true} />
                </div>
                <div className='mx-4 hidden h-[100%] w-[1px] bg-grey sm:block'></div>
                <div>
                  <span className='underline underline-offset-4'>
                    {Intl.NumberFormat('en', { notation: 'compact' }).format(product.view).toLowerCase()}
                  </span>
                  <span className='ml-2 inline-block text-[14px] text-[#767676]'>{t('rating')}</span>
                </div>
                <div className='mx-4 hidden h-[100%] w-[1px] bg-grey sm:block'></div>
                <div>
                  <span>{Intl.NumberFormat('en', { notation: 'compact' }).format(product.sold).toLowerCase()}</span>
                  <span className='ml-2 inline-block  text-[#767676]'>{t('sold')}</span>
                </div>
              </div>
            </div>
            <div className='mt-[10px] bg-[#fafafa] p-[15px]'>
              <div className='relative flex flex-col items-center sm:flex-row'>
                <div className='text-sm text-[#929292] line-through'>
                  ₫{new Intl.NumberFormat('de-DE').format(product.price_before_discount)}
                </div>
                <div className='ml-[10px] mr-[15px] text-[30px] font-[500] text-primary'>
                  ₫{new Intl.NumberFormat('de-DE').format(product.price)}
                </div>
                <div className='bg-primary px-[5px] text-xs font-bold uppercase text-white'>
                  {percent} {t('sale')}
                </div>
              </div>
            </div>
            <div className=' mt-[30px] flex h-[32px] items-center'>
              <p className='mr-[40px] text-sm text-[#757575]'>{t('quantity')}</p>
              <QuantityController
                quantity={quantity}
                max={product.quantity}
                handleQuantity={handleQuantity}
                handleOnType={handleQuantity}
              />
              <div className='ml-[15px]  hidden gap-1 text-sm text-[#757575] sm:flex'>
                <p>{product.quantity}</p>
                <p>{t('available')}</p>
              </div>
            </div>
            <div className='mt-4 flex gap-1 text-sm text-[#757575] sm:hidden'>
              <p>{product.quantity}</p>
              <p>{t('available')}</p>
            </div>
            <div className='mt-[30px] flex flex-col gap-4 sm:flex-row sm:items-center'>
              <MainButton
                className='!w-full border border-primary bg-[#feebe5] sm:!w-max'
                onClick={() => handleAddToCard(quantity, _id)}
              >
                <div className='flex items-center justify-center text-[#ee4d2d]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='mr-[10px] h-6 w-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                  <p>{t('add-to-cart')}</p>
                </div>
              </MainButton>
              <MainButton
                className='!w-full border border-primary sm:!w-max'
                onClick={() => handleBuyNow(quantity, _id)}
              >
                {t('buy-now')}
              </MainButton>
            </div>
          </div>
        </div>
        <div className='mt-[15px] p-[25px] shadow-md'>
          <div className='bg-[#fafafa] p-[15px] text-[18px] uppercase'>{t('product-description')}</div>
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className='mt-[30px] text-sm leading-[24px]'
          ></div>
        </div>
        <div className='mt-[50px]'>
          <p className='mb-[20px] font-[500] text-[#808080]'>{t('also-like')}</p>
          <div className='gap-4 sm:grid sm:grid-cols-3 xl:grid-cols-5'>
            {productsRelative &&
              productsRelative.data.data.products.map((e) => <ProductItem product={e} key={e._id} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
