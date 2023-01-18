export interface Products {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface Product {
  category: {
    _id: string
    name: string
    __v: number
  }
  description: string
  createdAt: string
  image: string
  images: string[]
  name: string
  price: number
  price_before_discount: number
  quantity: number
  rating: number
  sold: number
  updatedAt: string
  view: number
  _id: string
}

export interface ProductURL {
  page?: number | string
  limit?: number
  order?: 'desc' | 'asc'
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: string
  exclude?: string
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
