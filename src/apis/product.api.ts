import { ResponseApi } from 'src/types/utils.type'
import { ProductURL, Products, Product } from './../types/products.type'
import { http } from './../utils/http'
export const productApi = {
  getProducts: (params: ProductURL) => {
    return http.get<ResponseApi<Products>>('/products', {
      params
    })
  },
  getProductDetail: (id: string) => {
    return http.get<ResponseApi<Product>>(`/products/${id}`)
  }
}
