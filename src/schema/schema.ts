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
    .max(20, 'Nhiều nhất là 20 ký tự')
})

export default schema
