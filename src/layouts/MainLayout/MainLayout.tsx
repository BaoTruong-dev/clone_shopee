import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'

export default function MainLayout({ children }: { children?: JSX.Element }) {
  return (
    <Fragment>
      <Header />
      <div>
        {children}
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  )
}
