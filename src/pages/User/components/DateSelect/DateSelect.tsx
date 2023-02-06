import _ from 'lodash'

interface dateDrop {
  value: string
}

function DateSelect({ value }: dateDrop) {
  const date = new Date(value)

  return (
    <div className='flex flex-grow gap-[20px]'>
      <select
        className='w-full rounded-[2px] border py-[10px] px-[15px] text-[14px] focus:outline-gray-400'
        value={date.getDate()}
      >
        <option disabled>Ngày</option>
        {_.range(1, 32).map((e) => {
          return (
            <option value={e} key={e}>
              {e}
            </option>
          )
        })}
      </select>
      <select
        className='w-full rounded-[2px] border py-[10px] px-[15px] text-[14px] focus:outline-gray-400'
        value={date.getMonth() + 1}
      >
        <option disabled>Tháng</option>
        {_.range(0, 12).map((e) => {
          return (
            <option value={e} key={e}>
              {e + 1}
            </option>
          )
        })}
      </select>
      <select
        className='w-full rounded-[2px] border py-[10px] px-[15px] text-[14px] focus:outline-gray-400'
        value={date.getFullYear()}
      >
        <option disabled>Năm</option>
        {_.range(1990, new Date().getFullYear() + 1).map((e) => {
          return (
            <option value={e} key={e}>
              {e}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default DateSelect
