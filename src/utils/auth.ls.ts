export const saveDataLS = (access_token: string) => {
  return localStorage.setItem('access_token', access_token)
}

export const getAccessTokenLS = () => {
  return localStorage.getItem('access_token')
}
export const clearAccessTokenLS = () => {
  return localStorage.removeItem('access_token')
}

export const saveUserInfoLS = (user_info: any) => {
  return localStorage.setItem('user_info', JSON.stringify(user_info))
}

export const getUserInfoLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const clearUserInfoLS = () => {
  return localStorage.removeItem('user_info')
}
