import { ComponentStory, ComponentMeta } from '@storybook/react'

import MainButton from './MainButton'

export default {
  title: 'Components/MainButton',
  argTypes: {
    children: {
      description: 'Content Button',
      table: {
        type: {
          summary: 'String'
        }
      },
      defaultValue: { summary: '' }
    },
    className: {
      description: 'Class in Tailwind',
      table: {
        type: {
          summary: 'String'
        },
        defaultValue: {
          summary:
            'w-max cursor-pointer rounded-[2px] bg-primary py-[10px] px-[15px] text-center text-white hover:bg-opacity-[0.8]'
        }
      }
    }
  },
  component: MainButton
} as ComponentMeta<typeof MainButton>

const Template: ComponentStory<typeof MainButton> = (props) => <MainButton {...props} />

export const Primary = Template.bind({})

Primary.args = {
  children: 'Đăng Nhập',
  className:
    'w-max cursor-pointer rounded-[2px] bg-primary py-[10px] px-[15px] text-center text-white hover:bg-opacity-[0.8]'
}
