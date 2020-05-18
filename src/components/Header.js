import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { clearFix } from 'polished'

const HeadBar = styled.header`
  max-width: 1120px;
  margin: 20px auto;
  ${clearFix()}
`

const TitleLink = styled(Link)`
  display: block;
  text-decoration: none;
  margin-right: 40px;
  float: left;
`

const Title = styled.h1`
  margin: 0;
  color: #4e56dc;
  font-weight: 500;
  font-size: 24px;
  line-height: 40px;
  float: left;
`

const Logo = styled(Img)`
  float: left;
  margin-right: 20px;
`

const Nav = styled.nav`
  float: left;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      display: block;
      float: left;
      margin-right: 20px;
      padding: 8px 0;

      a {
        display: block;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        text-decoration: none;
        color: #130f49;
      }

      &:hover {
        padding: 8px 0 6px 0;
        a {
          border-bottom: 2px solid #ffde60;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
`

const Icons = styled.div`
  float: right;
  span,
  a {
    text-decoration: none;
    cursor: pointer;
    float: left;
    margin-right: 20px;
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    svg {
      stroke: #a7a5bb;
    }

    &:hover {
      svg {
        stroke: #535457;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

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
    <HeadBar>
      <TitleLink to="/">
        <Logo fixed={data.file.childImageSharp.fixed} alt="Logo of xueli.li" />
        <Title>xueli.li</Title>
      </TitleLink>
      <Nav>
        <ul>
          <li>
            <Link to="/posts">文章</Link>
          </li>
          <li>
            <Link to="/lab">实验室</Link>
          </li>
          <li>
            <a
              href="https://space.bilibili.com/7278038/"
              target="_blank"
              rel="noopener noreferrer"
            >
              视频
            </a>
          </li>
        </ul>
      </Nav>
      <Icons>
        <span role="button">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="title">Dark Mode</title>
            <path
              d="M11 1V2.81818M11 19.1818V21M3.92727 3.92727L5.21818 5.21818M16.7818 16.7818L18.0727 18.0727M1 11H2.81818M19.1818 11H21M3.92727 18.0727L5.21818 16.7818M16.7818 5.21818L18.0727 3.92727M15.5455 11C15.5455 13.5104 13.5104 15.5455 11 15.5455C8.48961 15.5455 6.45455 13.5104 6.45455 11C6.45455 8.48961 8.48961 6.45455 11 6.45455C13.5104 6.45455 15.5455 8.48961 15.5455 11Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title id="title">RSS</title>
            <path
              d="M1 8C3.38695 8 5.67613 8.94821 7.36396 10.636C9.05179 12.3239 10 14.6131 10 17M1 1C5.24346 1 9.31313 2.68571 12.3137 5.68629C15.3143 8.68687 17 12.7565 17 17M3 16C3 16.5523 2.55228 17 2 17C1.44772 17 1 16.5523 1 16C1 15.4477 1.44772 15 2 15C2.55228 15 3 15.4477 3 16Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </Icons>
    </HeadBar>
  )
}

export default Header
