import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout topPage={true}>
        <SEO
          title={this.props.data.site.siteMetadata.title}
          description={this.props.data.site.siteMetadata.description}
          slug={"/"}
          article={false}
        />
        <Articles>
          {posts.map(({ node }) => {
            const formattedDate = moment(node.frontmatter.date, "YYYY-MM-DD HH:mm:ss Z").local().format("MMMM Do, YYYY")
            return <Article key={node.fields.slug}>
              <StyledLink to={node.fields.slug}>{node.frontmatter.title}</StyledLink>
              <StyledDiv>{formattedDate}</StyledDiv>
              <StyledP>{node.excerpt}</StyledP>
            </Article>
          })}
        </Articles>
        <Pagination>
          {Array.from({ length: numPages }, (_, i) => {
            if (currentPage === i + 1) {
              return <Page key={`pagination-number${i + 1}`}><span>{i + 1}</span></Page>
            } else {
              return <Page key={`pagination-number${i + 1}`}><Link to={`/${i === 0 ? "" : i + 1}`}>{i + 1}</Link></Page>
            }
          })}
        </Pagination>
      </Layout>
    )
  }
}

const Articles = styled.ul`
  width: 800px;
  list-style: none;
  margin: 120px auto;
  padding: 0;
  @media (max-width: 800px) {
    width: 95%;
  }
`

const Article = styled.li`
  margin: 120px 0;
`

const StyledLink = styled(props => <Link {...props} />)`
  display: block;
  text-align: center;
`

const StyledDiv = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: hsl(235, 10%, 65%);
`

const StyledP = styled.p`
  word-break: break-all;
`

const Pagination = styled.ul`
  width: 800px;
  list-style: none;
  margin: 120px auto;
  padding: 0;
  text-align: center;
  @media (max-width: 800px) {
    width: 95%;
    overflow-x: scroll;
  }
`

const Page = styled.li`
  display: inline;
  margin: 4px;
`

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
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
            date
          }
          excerpt(
            format: PLAIN
            pruneLength: 300
            truncate: true
          )
        }
      }
    }
  }
`
