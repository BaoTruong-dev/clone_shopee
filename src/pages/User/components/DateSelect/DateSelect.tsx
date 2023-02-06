import _ from 'lodash'
import { useState } from 'react'

interface dateDrop {
  value: string
  onChange: (value: Date) => void
}

function DateSelect({ value, onChange }: dateDrop) {
  const valueDate = new Date(value)
  let newDate = {
    year: valueDate.getFullYear(),
    month: valueDate.getMonth(),
    date: valueDate.getDate()
  }

  const handleChangeTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.currentTarget
    newDate = {
      ...newDate,
      [name]: Number(value)
    }
    onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <div className='flex flex-grow gap-[20px]'>
      <select
        className='w-full rounded-[2px] border py-[10px] px-[15px] text-[14px] focus:outline-gray-400'
        value={newDate.date}
        name='date'
        onChange={handleChangeTime}
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
        value={newDate.month}
        name='month'
        onChange={handleChangeTime}
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
        value={newDate.year}
        name='year'
        onChange={handleChangeTime}
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
