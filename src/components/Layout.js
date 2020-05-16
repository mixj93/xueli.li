import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

import Header from './Header'
import Footer from './Footer'

const NormalizeStyle = createGlobalStyle`${normalize()}`

const Layout = ({ children }) => {
  return (
    <>
      <NormalizeStyle />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
