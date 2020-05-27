const { createHttpLink } = require("apollo-link-http")
const fetch = require("node-fetch")
const store = require("store")
const sourceNodes = require("gatsby/dist/utils/source-nodes")
const createSchemaCustomization = require("gatsby/dist/utils/create-schema-customization")
require("dotenv").config()

const craftGqlUrl = process.env.CRAFT_GQL_URL
const craftGqlToken = process.env.CRAFT_GQL_TOKEN

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter with CraftCMS. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Craft",
        fieldName: "craft",
        createLink: () =>
          createHttpLink({
            uri: `${craftGqlUrl}`,
            headers: {
              Authorization: `Bearer ${craftGqlToken}`,
            },
            fetch: (uri, options) => {
              const token = store.get("X-Craft-Token")
              return fetch(
                `${uri}${token !== undefined ? `?token=${token}` : ""}`,
                options
              )
            },
          }),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  developMiddleware: app => {
    app.use("*", (req, res, next) => {
      if (req.query.token) {
        store.set("X-Craft-Token", req.query.token)
        createSchemaCustomization({ refresh: true }).then(() => {
          sourceNodes({ webhookBody })
        })
      }
      next()
    })
  },
}
