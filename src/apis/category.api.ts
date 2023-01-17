import { Category } from 'src/types/category.type'
import { ResponseApi } from 'src/types/utils.type'
import { http } from './../utils/http'
const category = {
  getCategories: () => {
    return http.get<ResponseApi<Category[]>>('/categories')
  }
}

export default category
