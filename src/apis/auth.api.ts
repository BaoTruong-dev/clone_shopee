import { http } from './../utils/http'

const authApi = {
  register: (body: { email: string; password: string }) => {
    return http.post('register', body)
  },

  login: (body: { email: string; password: string }) => {
    return http.post('login', body)
  }
}

export default authApi
