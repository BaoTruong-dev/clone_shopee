import { Product } from './products.type'

export type PurchasesStatus = -1 | 0 | 1 | 2 | 3 | 4 | 5
export interface PurchasesAddItem {
  product_id: string
  buy_count: number
}

export interface PurchasesCart {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: PurchasesStatus
  user: string
  product: Product
  createdAt: string
  updatedAt: string
}

export interface PurchasesCartExtended extends PurchasesCart {
  disabled: boolean
  checked: boolean
}
