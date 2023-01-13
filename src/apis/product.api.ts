import { ResponseApi } from 'src/types/utils.type'
import { ProductParams, Products } from './../types/products.type'
import { http } from './../utils/http'
export const productApi = {
  getProducts: (params: ProductParams) => {
    return http.get<ResponseApi<Products>>('/products', {
      params
    })
  }
}
