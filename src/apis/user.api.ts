import { User } from 'src/types/user.type'
import { http } from './../utils/http'
import { ResponseApi } from 'src/types/utils.type'
import { dataUpdate } from 'src/pages/User/components/Profile/Profile'
const userApi = {
  getUser: () => {
    return http.get<ResponseApi<User>>('me')
  },
  updateUser: (data: dataUpdate) => {
    return http.put<ResponseApi<User>>('user', data)
  },
  uploadAvatar: (data: FormData) => {
    return http.put<ResponseApi<string>>('user/upload-avatar', data)
  }
}

export default userApi
