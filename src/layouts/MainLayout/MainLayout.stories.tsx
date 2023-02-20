import { ComponentMeta } from '@storybook/react'
import MainLayout from './MainLayout'
import { withRouter } from 'storybook-addon-react-router-v6'
import ProductDetail from 'src/pages/ProductDetail/ProductDetail'

export default {
  title: 'layouts/MainLayout',
  component: MainLayout,

} as ComponentMeta<typeof MainLayout>

export const MainLayOutPage = () => <MainLayout />
MainLayOutPage.story = {
  parameters: {
    reactRouter: {
      routePath: '/ĐiệnThoạiVsmartActive36GB64GBHàngChínhHãng-i,60afb2c76ef5b902180aacba',
      outlet: <ProductDetail />
    }
  }
}

// export const ProductDetailPage = () => <MainLayout />
// ProductDetailPage.story = {
//   parameters: {
//     reactRouter: {
//       routePath: '/ĐiệnThoạiVsmartActive36GB64GBHàngChínhHãng-i,60afb2c76ef5b902180aacba'
//     }
//   }
// }
