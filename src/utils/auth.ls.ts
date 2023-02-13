import { User } from 'src/types/user.type'

export const saveAccessTokenLS = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}
export const saveRefreshTokenLS = (access_token: string) => {
  return localStorage.setItem('refresh_token', access_token)
}
export const saveLanguageLS = (language: string) => {
  return localStorage.setItem('language', language)
}
export const getAccessTokenLS = () => {
  return localStorage.getItem('access_token') || ''
}
export const getRefreshTokenLS = () => {
  return localStorage.getItem('refresh_token') || ''
}
export const getLanguageLS = () => {
  return localStorage.getItem('language') || 'vi'
}

export const getUserInfoLS = () => {
  const result = localStorage.getItem('user_info')
  return result ? JSON.parse(result) : ''
}

export const saveUserInfoLS = (user_info: User) => {
  return localStorage.setItem('user_info', JSON.stringify(user_info))
}

export const clearDataLS = () => {
  return localStorage.clear()
}

export const removeDataLS = (key: string) => {
  return localStorage.removeItem(key)
}
