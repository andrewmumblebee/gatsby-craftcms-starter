import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = props => {
  const {
    data: {
      craft: { entries },
      site,
    },
  } = props

  return (
    <Layout site={site}>
      <SEO title="Home" site={site} />
      {entries.map(({ title, id, uri }) => (
        <Link key={id} to={uri}>
          {title}
        </Link>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    craft {
      entries {
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
