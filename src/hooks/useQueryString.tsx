import { ConfigURL } from 'src/pages/Home/Home'

export default function useQueryString(queryConfig: ConfigURL, page: string) {
  const queryString = new URLSearchParams({
    ...queryConfig,
    page
  }).toString()
  return queryString
}
