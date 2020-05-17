const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                id
              }
            }
          }
        }
      }
    `).then((results) => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: `/posts/${node.frontmatter.id}`,
          component: path.resolve('./src/components/Post.js'),
          context: {
            id: node.frontmatter.id
          }
        })
      })
      resolve()
    })
  })
}
