import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = props => {
  const {
    data: {
      craft: { entry },
    },
  } = props

  return (
    <Layout>
      <SEO title="Home" />
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
  }
`

export default IndexPage
