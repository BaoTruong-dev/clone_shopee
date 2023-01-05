import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    })
    this.instance.interceptors.response.use(
      function (response) {
        if (response.config.url === 'login' || response.config.url === 'register') {
          // saveAccessTokenLS(response.data.data.access_token)
          // saveUserInfoLS(response.data.data.user)
        }
        return response
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  }
}

export const http = new Http().instance
