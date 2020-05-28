import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data: { site } }) => (
  <Layout site={site}>
    <SEO title="404: Not found" site={site} />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`

export default NotFoundPage
