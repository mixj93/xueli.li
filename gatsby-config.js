module.exports = {
  siteMetadata: {
    title: `Blog of Li Xueli`,
    description: `Love, Death & Codes ❤️ ❌ ⌨️`,
    author: `@mixj93`
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blog of Li Xueli`,
        short_name: `xuel.li`,
        start_url: `/`,
        background_color: `#663399`, // TODO
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.png` // This path is relative to the root of the site.
      }
    },
    `gatsby-plugin-offline`, // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    }
  ]
}
