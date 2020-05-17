import React from 'react'
import { graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'

import Layout from './Layout'
import GITHUB_MARKDOWN_STYLE from '../constants/githubMarkdownStyle'

const MarkdownStyle = createGlobalStyle`${GITHUB_MARKDOWN_STYLE}`

const Post = ({ data }) => {
  const { markdownRemark } = data
  return (
    <Layout>
      <MarkdownStyle />
      <h1>{markdownRemark.frontmatter.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: markdownRemark.tableOfContents }}
      />
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($id: String!) {
    markdownRemark(frontmatter: { id: { eq: $id } }) {
      html
      frontmatter {
        id
        title
        date
        tags
      }
      tableOfContents(absolute: false, heading: null, maxDepth: 6)
    }
  }
`

export default Post
