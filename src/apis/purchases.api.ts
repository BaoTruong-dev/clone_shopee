import { http } from './../utils/http'
import { PurchasesAddItem, PurchasesCart, PurchasesStatus } from './../types/purchases.type'
import { ResponseApi } from 'src/types/utils.type'

const URL = 'purchases'

export const purchasesApi = {
  addToCart: (data: PurchasesAddItem) => {
    return http.post<ResponseApi<PurchasesCart>>(`${URL}/add-to-cart`, data)
  },
  getCart: (status: PurchasesStatus) => {
    return http.get<ResponseApi<PurchasesCart[]>>(URL, {
      params: {
        status
      }
    })
  }
}
