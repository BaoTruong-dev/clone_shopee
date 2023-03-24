import { ComponentMeta } from '@storybook/react'

import ProductDetail from 'src/pages/ProductDetail/ProductDetail'
import MainLayout from './MainLayout'
export default {
  title: 'Layouts/MainLayout',
  component: MainLayout
} as ComponentMeta<typeof MainLayout>

export const MainLayoutPage = () => <MainLayout />
MainLayoutPage.story = {
  parameters: {
    reactRouter: {
      routePath: '/ĐiệnThoạiVsmartActive36GB64GBHàngChínhHãng-i,60afb2c76ef5b902180aacba',
      outlet: <ProductDetail />
    }
  }
}
