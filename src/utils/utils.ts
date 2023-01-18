import { divide } from 'lodash'

export const compareValue = (valueFirst: string, valueSecond: string) => {
  if (valueFirst === valueSecond) {
    return true
  }
  return false
}

export const handlePercent = (originalPrice: number, price: number) => {
  return Math.round(((originalPrice - price) / originalPrice) * 100) + '%'
}
