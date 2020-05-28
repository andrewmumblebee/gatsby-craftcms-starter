import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = props => {
  const {
    data: {
      craft: { entry },
      site,
    },
  } = props

  return (
    <Layout site={site}>
      <SEO title="Home" site={site} />
      <h1>{entry.title} </h1>
      <h2>{entry.id} </h2>
      <h3>{entry.uri} </h3>
    </Layout>
  )
}

export const pageQuery = graphql`
  query EntryQuery($uri: [String]) {
    craft {
      entry(uri: $uri) {
        id
        title
        uri
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

export default IndexPage
