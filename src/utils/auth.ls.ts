import { User } from 'src/types/user.type'

export const saveAccessTokenLS = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}
export const getAccessTokenLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const saveUserInfoLS = (user_info: User) => {
  return localStorage.setItem('user_info', JSON.stringify(user_info))
}

export const getUserInfoLS = () => {
  const result = localStorage.getItem('user_info')
  return result ? JSON.parse(result) : ''
}

export const clearDataLS = () => {
  return localStorage.clear()
}

export const removeDataLS = (key: string) => {
  return localStorage.removeItem(key)
}
