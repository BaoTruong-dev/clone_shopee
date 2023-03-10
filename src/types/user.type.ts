type Role = 'User' | 'Admin'

export interface User {
  _id?: string
  roles?: Role[]
  email?: string
  name?: string
  date_of_birth?: null
  avatar?: string
  address?: string
  phone?: string
  createdAt?: string
}
