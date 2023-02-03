import { http } from './../utils/http'
import { PurchasesAddItem, PurchasesCart, PurchasesStatus } from './../types/purchases.type'
import { ResponseApi } from 'src/types/utils.type'

const URL = 'purchases'

export const purchasesApi = {
  getCart: (status: PurchasesStatus) => {
    return http.get<ResponseApi<PurchasesCart[]>>(URL, {
      params: {
        status
      }
    })
  },
  addToCart: (data: PurchasesAddItem) => {
    return http.post<ResponseApi<PurchasesCart>>(`${URL}/add-to-cart`, data)
  },
  updateCart: (data: PurchasesAddItem) => {
    return http.put<ResponseApi<PurchasesCart>>(`${URL}/update-purchase`, data)
  },
  buyCart: (data: PurchasesAddItem[]) => {
    return http.post<ResponseApi<PurchasesCart>>(`${URL}/buy-products`, data)
  },
  deleteCart: (data: string[]) => {
    return http.delete<ResponseApi<{ deleted_count: number }>>(`${URL}`, {
      data
    })
  }
}
