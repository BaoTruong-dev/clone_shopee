import { getAccessTokenLS } from 'src/utils/auth.ls'
import { saveAccessTokenLS, saveUserInfoLS } from './auth.ls'
import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  accessToken: string
  constructor() {
    this.accessToken = getAccessTokenLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        if (response.config.url === 'login' || response.config.url === 'register') {
          this.accessToken = response.data.data.access_token
          saveAccessTokenLS(this.accessToken)
          saveUserInfoLS(response.data.data.user)
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
