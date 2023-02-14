import axios, { AxiosHeaders, AxiosInstance } from 'axios'
import { URL } from 'src/constant/url'
import { clearDataLS, getAccessTokenLS, getRefreshTokenLS, saveRefreshTokenLS } from 'src/utils/auth.ls'
import { saveAccessTokenLS, saveUserInfoLS } from './auth.ls'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  constructor() {
    this.accessToken = getAccessTokenLS()
    this.refreshToken = getRefreshTokenLS()

    this.instance = axios.create({
      baseURL: URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 5
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          ;(config.headers as AxiosHeaders).set('authorization', this.accessToken)
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
          this.refreshToken = response.data.data.refresh_token
          saveAccessTokenLS(this.accessToken)
          saveRefreshTokenLS(this.refreshToken)
          saveUserInfoLS(response.data.data.user)
        } else if (response.config.url === 'logout') {
          this.accessToken = ''
          this.refreshToken = ''
          clearDataLS()
        }
        return response
      },
      (error: any) => {
        const config = error.response?.config || {}
        const { url } = config
        if (error.response.status === 422) {
          return Promise.reject(error)
        } else if (
          error.response.status === 401 &&
          error.response.data.data.name === 'EXPIRED_TOKEN' &&
          url !== 'refresh-access-token'
        ) {
          return this.instance
            .post('refresh-access-token', {
              refresh_token: this.refreshToken
            })
            .then((res) => {
              const { access_token } = res.data.data
              saveAccessTokenLS(access_token)
              this.accessToken = access_token
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
            .catch((error) => {
              const ToKenExpired = new Event('token_expired')
              document.dispatchEvent(ToKenExpired)
              clearDataLS()
              return Promise.reject(error)
            })
        }
      }
    )
  }
}

export const http = new Http().instance
