import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"
import Layout from "../components/layout"

export default class Blog extends React.Component {
  render() {
    const { markdownRemark } = this.props.data
    const { frontmatter, html, excerpt } = markdownRemark

    return (
      <>
        <GlobalStyle/>
        <Layout topPage={false} title={frontmatter.title} date={frontmatter.date}>
          <Helmet>
            <meta charSet="utf-8"/>
            <title>{frontmatter.title} | {this.props.data.site.siteMetadata.title}</title>
            <meta name="description" content={excerpt}/>
          </Helmet>
          <Article className="content" dangerouslySetInnerHTML={{ __html: html }}/>
        </Layout>
      </>
    )
  }
}

const Article = styled.article`
  margin: 40px 0;
`

const GlobalStyle = createGlobalStyle`
  .content p {
    width: 800px;
    margin: 40px auto;
  }
  @media (max-width: 800px) {
    .content p {
      width: 95%;
    }
  }
  .content p:first-child {
    margin-top: 0;
  }
  .content p:last-child {
    margin-bottom: 0;
  }
  .content h1 {
    width: 800px;
    margin: 120px auto 20px;
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
  }
  @media (max-width: 800px) {
    .content h1 {
      width: 95%;
    }
  }
  .content h2 {
    width: 800px;
    margin: 120px auto 20px;
    font-size: 2.4rem;
    font-weight: bold;
  }
  @media (max-width: 800px) {
    .content h2 {
      width: 95%;
    }
  }
  .content h2:first-child {
    margin-top: 0;
  }
  .content h2 + p {
    margin-top: 0;
  }
  .content h2 + h2 {
    margin-top: 0;
  }
  .content h4 {
    width: 800px;
    margin: 10px auto 10px;
    font-size: 1.8rem;
    font-weight: normal;
    text-align: center;
  }
  @media (max-width: 800px) {
    .content h4 {
      width: 95%;
    }
  }
  .content ul,
  .content ol {
    width: 780px;
    margin: auto;
    padding-left: 20px;
  }
  @media (max-width: 800px) {
    .content ul,
    .content ol {
      width: 90%;
      padding-left: 5%;
    }
  }
  .content figure {
    width: 800px;
    margin: auto;
  }
  @media (max-width: 800px) {
    .content figure {
      width: 95%;
    }
  }
  .content img {
    display: block;
    max-width: 800px;
    margin: 0 auto;
  }
  @media (max-width: 800px) {
    .content img {
      max-width: 95%;
    }
  }
  .content blockquote {
    width: 800px;
    margin: 20px auto;
  }
  @media (max-width: 800px) {
    .content blockquote {
      width: 95%;
    }
  }
  .content blockquote > p {
    position: relative;
    width: 780px;
    padding-left: 20px;
  }
  @media (max-width: 800px) {
    .content blockquote > p {
      width: 96%;
      padding-left: 4%;
    }
  }
  .content blockquote > p::before {
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
  .content pre {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 40px 0;
    padding: 1em 0;
  }
  .content pre > code {
    min-width: 800px;
  }
  @media (max-width: 800px) {
    .content pre > code {
      min-width: 95%;
      max-width: 95%;
    }
  }
`

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      frontmatter {
        title
        date(formatString: "YYYY.M.D")
      }
    }
  }
`
