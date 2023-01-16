import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ConfigURL } from 'src/pages/Home/Home'
import { router } from '../../constant/router'
import { number } from 'yup'
import useQueryString from 'src/hooks/useQueryString'

interface PaginateProps {
  queryConfig: ConfigURL
  pageSize: number
}

export default function Paginate({ queryConfig, pageSize }: PaginateProps) {
  const currentPage = Number(queryConfig.page)
  const handleQueryString = (page: string) => {
    const queryString = new URLSearchParams({
      ...queryConfig,
      page
    }).toString()
    return queryString
  }
  const renderUiPage = () => {
    let dotBefore = false
    let dotAfter = false
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const page = index + 1
        if (page === currentPage || page === pageSize || page === pageSize - 1 || page === 1 || page === 2) {
          return (
            <Link
              to={{
                pathname: router.home,
                search: `${handleQueryString(page.toString())}`
              }}
              className={classNames('cursor-pointer px-4 py-2 hover:bg-primary hover:text-[white]', {
                'bg-primary text-[white]': page === currentPage
              })}
              key={index}
            >
              {page}
            </Link>
          )
        } else if (
          currentPage - page === 1 ||
          currentPage - page === 2 ||
          currentPage + 1 === page ||
          currentPage + 2 === page
        ) {
          return (
            <Link
              to={{
                pathname: router.home,
                search: `${handleQueryString(page.toString())}`
              }}
              className={classNames('cursor-pointer px-4 py-2 hover:bg-primary hover:text-[white]', {
                'bg-primary text-[white]': page === currentPage
              })}
              key={index}
            >
              {page}
            </Link>
          )
        } else {
          if (!dotBefore) {
            dotBefore = true
            return <div key={index}>...</div>
          } else {
            if (currentPage > 5 && page > currentPage + 2) {
              if (!dotAfter) {
                dotAfter = true
                return <div key={index}>...</div>
              }
            }
          }
        }
      })
  }

  return (
    <div className='mt-[40px] flex justify-center'>
      <div className='flex items-center justify-center gap-8 text-[#959595]'>
        <Link
          to={{
            pathname: router.home,
            search: `${handleQueryString((currentPage - 1).toString())}`
          }}
          className={classNames({ hidden: currentPage === 1 })}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={classNames('h-5 w-5')}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </Link>
        {renderUiPage()}
        <Link
          to={{
            pathname: router.home,
            search: `${handleQueryString((currentPage + 1).toString())}`
          }}
          className={classNames('rotate-180', { hidden: currentPage === pageSize })}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={classNames('h-5 w-5')}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </Link>
      </div>
    </div>
  )
}
