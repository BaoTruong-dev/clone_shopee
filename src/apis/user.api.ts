import { PasswordUpdate } from 'src/pages/User/components/ChangePassword/ChangePassword'
import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'
import { DataUpdate } from './../pages/User/components/Profile/Profile'
import { http } from './../utils/http'
const userApi = {
  getUser: () => {
    return http.get<ResponseApi<User>>('me')
  },
  updateUser: (data: DataUpdate | PasswordUpdate) => {
    return http.put<ResponseApi<User>>('user', data)
  },
  uploadAvatar: (data: FormData) => {
    return http.post<ResponseApi<string>>('user/upload-avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
