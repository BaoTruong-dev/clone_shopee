import { AuthResponseApi } from 'src/types/auth.type'
import { http } from './../utils/http'

const authApi = {
  register: (body: { email: string; password: string }) => {
    return http.post<AuthResponseApi>('register', body)
  },

  login: (body: { email: string; password: string }) => {
    return http.post<AuthResponseApi>('login', body)
  },
  logout: () => {
    return http.post('logout')
  }
}

export default authApi
