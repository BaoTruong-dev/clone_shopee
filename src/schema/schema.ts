import { Schema } from 'inspector'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      'Email không hợp lệ!'
    ),
  password: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .min(6, 'Ít nhất là 6 ký tự')
    .max(20, 'Nhiều nhất là 20 ký tự'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập trường này!')
    .min(6, 'Ít nhất là 6 ký tự')
    .max(20, 'Nhiều nhất là 20 ký tự'),
  name: yup.string().trim().required()
})

export const userSchema = yup.object().shape({
  address: yup.string().max(160, 'Tối đa là 160 ký tự'),
  date_of_birth: yup.date(),
  name: yup.string().max(160, 'Tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Tối đa là 20 ký tự'),
  avatar: yup.string().max(160, 'Tối đa là 160 ký tự'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_new_password: yup
    .string()
    .required('Nhập lại password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('new_password')], 'Nhập lại password không khớp')
})

export type SchemaType = yup.InferType<typeof schema>
export type UserSchemaType = yup.InferType<typeof userSchema>

export default schema
