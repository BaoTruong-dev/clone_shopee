import { http } from './../utils/http'
export const authRegister = (body: { email: string; password: string }) => {
  return http.post('register', body)
}
