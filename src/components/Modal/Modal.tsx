import React from 'react'
import ReactDOM from 'react-dom'

export default function Modal({ children }: { children: JSX.Element }) {
  const body = document.querySelector('body') as HTMLElement
  return ReactDOM.createPortal(
    <div className='fixed inset-0 flex items-center justify-center bg-white bg-opacity-50'>{children}</div>,
    body
  )
}
