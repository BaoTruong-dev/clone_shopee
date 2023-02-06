/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import MainButton from 'src/components/MainButton/MainButton'
import { router } from 'src/constant/router'
import _ from 'lodash'
import { ConfigURL } from 'src/hooks/useQueryConfig'
interface SortProps {
  queryConfig: ConfigURL
  pageSize: number
}

export default function SortProducts({ queryConfig, pageSize }: SortProps) {
  const navigate = useNavigate()

  const page = Number(queryConfig.page)
  const checkActive = (value: string) => {
    return value === queryConfig.sort_by
  }
  const handleSortValue = (key: string, value: string, omit?: string | string[]) => {
    const queryString = new URLSearchParams(
      _.omit(
        {
          ...queryConfig,
          [key]: value
        },
        omit ? omit : ''
      )
    ).toString()
    return navigate({
      pathname: router.home,
      search: `?${queryString}`
    })
  }
  const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value
    const queryString = new URLSearchParams({
      ...queryConfig,
      sort_by: 'price',
      order: value
    }).toString()
    return navigate({
      pathname: router.home,
      search: `?${queryString}`
    })
  }
  return (
    <div className='flex flex-wrap items-center justify-between'>
      <div className='flex items-center gap-[10px]'>
        <p className='shrink-0'>Sắp xếp theo</p>
        <MainButton
          onClick={() => handleSortValue('sort_by', 'createdAt', 'order')}
          className={classNames('bg-white text-black', { '!bg-primary !text-white': checkActive('createdAt') })}
        >
          Mới nhất
        </MainButton>
        <MainButton
          onClick={() => handleSortValue('sort_by', 'view', 'order')}
          className={classNames('bg-white text-black', { '!bg-primary !text-white': checkActive('view') })}
        >
          Phổ biến
        </MainButton>
        <MainButton
          onClick={() => handleSortValue('sort_by', 'sold', 'order')}
          className={classNames('bg-white text-black', { '!bg-primary !text-white': checkActive('sold') })}
        >
          Bán chạy
        </MainButton>
        <select
          className={classNames(
            'w-[200px] rounded-sm border border-slate-200 bg-white py-[10px] px-[15px] outline-none',
            { '!bg-primary !text-white': queryConfig.order }
          )}
          value={queryConfig.order}
          onChange={handleSortPrice}
        >
          <option value='' disabled>
            Giá
          </option>
          <option value='asc'>Giá: Thấp đến Cao</option>
          <option value='desc'>Giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className='flex items-center'>
        <div className='mr-6'>
          <span className='text-primary'>{page}</span>
          <span>/</span>
          <span>{pageSize}</span>
        </div>
        <div className='flex items-center'>
          <div
            className={classNames(
              'flex h-[40px] w-[40px] cursor-not-allowed  items-center justify-center border border-grey-light',
              {
                '!cursor-pointer bg-white hover:bg-grey': page > 1
              }
            )}
            onClick={() => {
              if (!(page < 2)) {
                handleSortValue('page', (page - 1).toString())
              }
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3 rotate-[180deg]'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </div>
          <div
            className={classNames(
              'flex h-[40px] w-[40px] cursor-not-allowed items-center justify-center border border-grey-light',
              {
                '!cursor-pointer bg-white hover:bg-grey': page < pageSize
              }
            )}
            onClick={() => {
              if (page < pageSize) {
                handleSortValue('page', (page + 1).toString())
              }
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3 '
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
