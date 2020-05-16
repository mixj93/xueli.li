import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 40, height: 40) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <header>
      <h1>
        <Link to="/">
          <Img fixed={data.file.childImageSharp.fixed} alt="Logo of xueli.li" />
          xueli.li
        </Link>
      </h1>
    </header>
  )
}

export default Header
