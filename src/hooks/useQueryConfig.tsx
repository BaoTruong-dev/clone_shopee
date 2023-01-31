import { ProductURL } from 'src/types/products.type'
import useQueryString from './useQueryString'
import _ from 'lodash'
export type ConfigURL = {
  [key in keyof ProductURL]: string
}

export default function useQueryConfig() {
  const queryString: ConfigURL = useQueryString()
  const queryConfig: ConfigURL = _.omitBy(
    {
      page: queryString.page || '1',
      limit: queryString.limit,
      order: queryString.order,
      sort_by: queryString.sort_by || 'createdAt',
      category: queryString.category,
      exclude: queryString.exclude,
      rating_filter: queryString.rating_filter,
      price_max: queryString.price_max,
      price_min: queryString.price_min,
      name: queryString.name
    },
    _.isUndefined
  )
  return queryConfig
}
