import { dataUpdate } from './../pages/User/components/Profile/Profile'
import { User } from 'src/types/user.type'
import { http } from './../utils/http'
import { ResponseApi } from 'src/types/utils.type'
const userApi = {
  getUser: () => {
    return http.get<ResponseApi<User>>('me')
  },
  updateUser: (data: dataUpdate) => {
    return http.put<ResponseApi<User>>('user', data)
  }
}

export default userApi
