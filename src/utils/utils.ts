import { URL } from 'src/constant/url'
import empty_avatar from '../assets/empty_ava.png'
export const compareValue = (valueFirst: string, valueSecond: string) => {
  if (valueFirst === valueSecond) {
    return true
  }
  return false
}

export const handlePercent = (originalPrice: number, price: number) => {
  return Math.round(((originalPrice - price) / originalPrice) * 100) + '%'
}

export const getUrlAvatar = (avatar: string | undefined) => {
  return avatar ? `${URL}images/${avatar}` : empty_avatar
}
