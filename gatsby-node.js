/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  // do the big ole query
  return graphql(`
    {
      craft {
        entries {
          title
          uri
          id
        }
      }
    }
  `).then(result => {
    // catch them errors
    if (result.errors) {
      // eslint-disable-next-line no-console
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    // grab the entries off the result
    const {
      data: {
        craft: { entries },
      },
    } = result

    entries.forEach(entry => {
      const { uri, id } = entry

      createPage({
        context: {
          id,
          uri,
        },
        path: uri,
        component: path.resolve("src/templates/entry.js"),
      })
    })
  })
}
