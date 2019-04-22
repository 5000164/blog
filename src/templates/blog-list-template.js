import React from "react"
import { graphql, Link } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import PostLink from "../components/post-link"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{this.props.data.site.siteMetadata.title}</title>
          <meta name="description" content={this.props.data.site.siteMetadata.description}/>
        </Helmet>
        {posts.map(({ node }) => <PostLink key={node.fields.slug} post={node}/>)}
        {Array.from({ length: numPages }, (_, i) => {
          if (currentPage === i + 1) {
            return <span key={`pagination-number${i + 1}`}>{i + 1}</span>
          } else {
            return <Link key={`pagination-number${i + 1}`} to={`/${i === 0 ? "" : i + 1}`}>{i + 1}</Link>
          }
        })}
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
