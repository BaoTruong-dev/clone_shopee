import classNames from 'classnames'
import i18next from 'i18next'
import _ from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import MainButton from 'src/components/MainButton/MainButton'
import StarFilter from 'src/components/StarFilter/StarFilter'
import { router } from 'src/constant/router'
import { ConfigURL } from 'src/hooks/useQueryConfig'
import { Category } from 'src/types/category.type'
import { categoriesI18t } from '../../../constant/lang'
interface AsideFilterProps {
  queryConfig: ConfigURL
  categories: Category[]
}
interface PriceFilter {
  minPrice: number
  maxPrice: number
}

export default function AsideFilter({ queryConfig, categories }: AsideFilterProps) {
  const navigate = useNavigate()
  const { t } = useTranslation('home')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({
    minPrice: NaN,
    maxPrice: NaN
  })
  const [errorPrice, setErrorPrice] = useState<string>('')
  const handleOnChangePrice = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPriceFilter({
      ...priceFilter,
      [key]: value
    })
  }
  const handleQueryString = (key: string, value: string) => {
    const queryString = new URLSearchParams({
      ...queryConfig,
      page: '1',
      [key]: value
    }).toString()
    return navigate({
      pathname: router.home,
      search: `${queryString}`
    })
  }
  const handleSortPrice = () => {
    if (priceFilter.minPrice && priceFilter.maxPrice) {
      if (Number(priceFilter.minPrice) > Number(priceFilter.maxPrice)) {
        return setErrorPrice('Vui lòng điền khoảng giá phù hợp')
      }
      const queryString = new URLSearchParams({
        ...queryConfig,
        page: '1',
        price_max: priceFilter.maxPrice.toString(),
        price_min: priceFilter.minPrice.toString()
      }).toString()
      navigate({
        pathname: router.home,
        search: `${queryString}`
      })
    } else {
      if (priceFilter.minPrice) {
        const queryString = new URLSearchParams(
          _.omit(
            {
              ...queryConfig,
              price_min: priceFilter.minPrice.toString()
            },
            'price_max'
          )
        ).toString()
        navigate({
          pathname: router.home,
          search: `${queryString}`
        })
      } else if (priceFilter.maxPrice) {
        const queryString = new URLSearchParams(
          _.omit(
            {
              ...queryConfig,
              price_max: priceFilter.maxPrice.toString()
            },
            'price_min'
          )
        ).toString()
        navigate({
          pathname: router.home,
          search: `${queryString}`
        })
      } else {
        const queryString = new URLSearchParams(
          _.omit(
            {
              ...queryConfig,
              price_max: priceFilter.maxPrice.toString()
            },
            'price_min',
            'price_max'
          )
        ).toString()
        navigate({
          pathname: router.home,
          search: `${queryString}`
        })
      }
    }

    return setErrorPrice('')
  }
  const activeClass = (id: string) => {
    return id === queryConfig.category
  }

  const handleClearCategoryParams = () => {
    const queryString = new URLSearchParams(
      _.omit(
        {
          ...queryConfig
        },
        'category'
      )
    ).toString()
    return navigate({
      pathname: router.home,
      search: `${queryString}`
    })
  }
  const handleClearFilter = () => {
    const queryString = new URLSearchParams(
      _.omit(
        {
          ...queryConfig
        },
        ['rating_filter', 'price_max', 'price_min', 'category']
      )
    ).toString()
    return navigate({
      pathname: router.home,
      search: `${queryString}`
    })
  }

  return (
    <div className='text-sm'>
      <div>
        <div className='flex items-center' onClick={handleClearCategoryParams} tabIndex={0} role='button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke={!queryConfig.category ? '#ee4d2d' : 'currentColor'}
            className='h-4 w-4'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
            />
          </svg>
          <p className={classNames('ml-[5px] cursor-pointer font-bold', { 'text-primary': !queryConfig.category })}>
            {t('aside-filter.all-category')}
          </p>
        </div>
        <div className='my-[15px] h-[1px] w-full bg-slate-200'></div>
        {categories?.map((e, index) => {
          return (
            <div
              className='mb-[5px] flex cursor-pointer items-center'
              key={e._id}
              onClick={() => handleQueryString('category', e._id)}
              tabIndex={0}
              role='button'
            >
              <div className='h-3 w-3 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 256 512'
                  className={classNames('hidden h-full w-full fill-primary', { '!block': activeClass(e._id) })}
                >
                  <path d='M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z' />
                </svg>
              </div>
              <p className={classNames('ml-[5px] text-sm ', { 'font-bold text-primary': activeClass(e._id) })}>
                {i18next.language === 'vi' ? e.name : categoriesI18t[index]}
              </p>
            </div>
          )
        })}
      </div>
      <div className='mt-[20px]'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-3 w-3'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
            />
          </svg>
          <p className='ml-[5px] font-bold'>{t('aside-filter.search-filter')}</p>
        </div>
        <div className='my-[15px] h-[1px] w-full bg-slate-200'></div>
        <div>
          <p className='font-medium'>{t('aside-filter.price-range')}</p>
          <div className='space-between mt-[10px] flex items-center gap-6'>
            <input
              type='number'
              placeholder={`₫ ${t('aside-filter.from')}`}
              value={priceFilter.minPrice}
              min={1}
              onChange={handleOnChangePrice('minPrice')}
              className='w-full rounded-sm border border-slate-200 p-[5px] outline-none'
            />
            <div className=' relative after:absolute after:top-[50%] after:left-[50%] after:h-[2px] after:w-2 after:translate-x-[-50%] after:translate-y-[-50%] after:bg-slate-200'></div>
            <input
              type='number'
              placeholder={`₫ ${t('aside-filter.to')}`}
              onChange={handleOnChangePrice('maxPrice')}
              value={priceFilter.maxPrice}
              className='w-full rounded-sm border border-slate-200 p-[5px] outline-none'
            />
          </div>
          <div className='mt-2 text-center text-xs text-red-500'>{errorPrice}</div>
          <MainButton onClick={handleSortPrice} className='mt-[30px] !w-full'>
            {t('aside-filter.apply')}
          </MainButton>
        </div>
        <div className='my-[15px] h-[1px] w-full bg-slate-200'></div>
        <div>
          <div className='mb-[5px] font-medium'>{t('aside-filter.rating')}</div>
          <StarFilter queryConfig={queryConfig} text={t('aside-filter.up')} />
        </div>
        <div className='my-[15px] h-[1px] w-full bg-slate-200'></div>
        <MainButton onClick={handleClearFilter} className='!w-full'>
          {t('aside-filter.clear-all')}
        </MainButton>
      </div>
    </div>
  )
}
