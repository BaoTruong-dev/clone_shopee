import classNames from 'classnames'

interface PaginateProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

export default function Paginate({ currentPage, setCurrentPage, pageSize }: PaginateProps) {
  const renderUiPage = () => {
    let dot = false
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        if (
          index + 1 === currentPage ||
          index + 1 === pageSize ||
          index + 1 === pageSize - 1 ||
          index + 1 === 1 ||
          index + 1 === 2
        ) {
          return (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              className={classNames('cursor-pointer', { 'text-primary': index + 1 === currentPage })}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </div>
          )
        } else if (
          currentPage - (index + 1) === 1 ||
          currentPage - (index + 1) === 2 ||
          currentPage + 1 === index + 1 ||
          currentPage + 2 === index + 1
        ) {
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className={classNames('cursor-pointer', { 'text-primary': index + 1 === currentPage })}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </div>
          )
        } else {
          if (!dot) {
            dot = true
            return (
              <div className='cursor-pointer' key={index}>
                ...
              </div>
            )
          }
          return null
        }
      })
  }

  return (
    <div className='mt-[40px] flex justify-center'>
      <div className='flex items-center justify-center gap-8 text-[#959595]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5 cursor-pointer'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
        {renderUiPage()}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5 cursor-pointer'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </div>
    </div>
  )
}
