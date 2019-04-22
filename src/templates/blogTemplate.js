import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

export default function Template({ data }) {
  const { site, markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {frontmatter.title} | {site.siteMetadata.title}
        </title>
        <meta name="description" content={excerpt} />
      </Helmet>
      <h2>{frontmatter.title}</h2>
      <div>{frontmatter.date}</div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "YYYY.MM.DD")
      }
    }
  }
`
