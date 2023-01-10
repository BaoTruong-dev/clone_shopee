import MainButton from 'src/components/MainButton/MainButton'

export default function SortProducts() {
  return (
    <div className='flex flex-wrap items-center justify-between'>
      <div className='flex items-center gap-[10px]'>
        <p className='shrink-0'>Sắp xếpp theo</p>
        <MainButton>Phổ biến</MainButton>
        <MainButton>Mới nhất</MainButton>
        <MainButton>Bán chạy</MainButton>
        <select className='w-[200px] rounded-sm border border-slate-200 bg-white p-[10px] outline-none'>
          <option disabled selected value=' '>
            Giá
          </option>
          <option value=''>Giá: Thấp đến Cao</option>
          <option value=''>Giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className='flex items-center'>
        <div>
          <span>1</span>
          <span>/</span>
          <span>9</span>
        </div>
        <div className='flex items-center'>
          <div className='flex h-[40px] w-[40px] items-center justify-center border border-slate-200 bg-slate-50 opacity-80'>
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
          <div className='flex h-[40px] w-[40px] items-center justify-center border border-slate-200'>
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
