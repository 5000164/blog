import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default class Blog extends React.Component {
  render() {
    const { markdownRemark } = this.props.data
    const { frontmatter, html, excerpt } = markdownRemark
    const { previous, next } = this.props.pageContext

    return (
      <Layout topPage={false} slug={markdownRemark.fields.slug} title={frontmatter.title} date={frontmatter.date}>
        <SEO
          title={frontmatter.title + " | " + this.props.data.site.siteMetadata.title}
          description={excerpt}
          slug={markdownRemark.fields.slug}
          article={true}
        />
        <Article dangerouslySetInnerHTML={{ __html: html }}/>
        <StyledUl>
          <PreviousLi>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <div>←</div>
                <div>{previous.frontmatter.title}</div>
              </Link>
            )}
          </PreviousLi>
          <NextLi>
            {next && (
              <Link to={next.fields.slug} rel="next">
                <div>→</div>
                <div>{next.frontmatter.title}</div>
              </Link>
            )}
          </NextLi>
        </StyledUl>
      </Layout>
    )
  }
}

const Article = styled.article`
  margin: 60px 0;
  p {
    width: 800px;
    margin: 20px auto;
  }
  @media (max-width: 800px) {
    p {
      width: 95%;
    }
  }
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
  h1 {
    width: 800px;
    margin: 60px auto 20px;
    padding: 0 0 20px 0;
    font-size: 2.4rem;
    font-weight: bold;
    border-bottom: 1px solid hsl(235, 10%, 30%);
  }
  @media (max-width: 800px) {
    h1 {
      width: 95%;
    }
  }
  h2 {
    width: 800px;
    margin: 60px auto 20px;
    padding: 0;
    font-size: 2.0rem;
    font-weight: bold;
  }
  @media (max-width: 800px) {
    h2 {
      width: 95%;
    }
  }
  h1 + h2 {
    margin-top: 20px;
  }
  ul, ol {
    width: 780px;
    margin: auto;
    padding-left: 20px;
  }
  @media (max-width: 800px) {
    ul, ol {
      width: 90%;
      padding-left: 5%;
    }
  }
  ul p, ol p {
    margin-top: 0;
    margin-bottom: 0;
  }
  img {
    display: block;
    max-width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    img {
      max-width: 95%;
    }
  }
  blockquote {
    width: 800px;
    margin: 20px auto;
  }
  @media (max-width: 800px) {
    blockquote {
      width: 95%;
    }
  }
  blockquote > p {
    position: relative;
    width: 780px;
    padding-left: 20px;
  }
  @media (max-width: 800px) {
    blockquote > p {
      width: 96%;
      padding-left: 4%;
    }
  }
  blockquote > p::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: #e3e4e6;
    border-radius: 8px;
  }
  pre {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 40px 0;
    padding: 1em 0;
  }
  pre > code {
    min-width: 800px;
  }
  @media (max-width: 800px) {
    pre > code {
      min-width: 95%;
      max-width: 95%;
    }
  }
`

const StyledUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2em;
  width: 800px;
  list-style: none;
  margin: 120px auto;
  padding: 0;
  @media (max-width: 800px) {
    width: 95%;
  }
`

const PreviousLi = styled.li`
  text-align: left;
`

const NextLi = styled.li`
  text-align: right;
`

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        date
      }
      html
      excerpt(
        format: PLAIN
        pruneLength: 300
        truncate: true
      )
    }
  }
`
