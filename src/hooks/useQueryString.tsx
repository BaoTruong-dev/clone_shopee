import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

export default function useQueryString() {
  const { search } = useLocation()
  const parsed = queryString.parse(search)
  return parsed
}
