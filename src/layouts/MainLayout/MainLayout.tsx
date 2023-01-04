import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/Header/Header'

export default function MainLayout() {
  return (
    <Fragment>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  )
}
