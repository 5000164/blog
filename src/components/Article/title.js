import React from "react"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import moment from "moment"

const Title = ({ data, slug, title, date }) => {
  const historyLink = data.site.siteMetadata.repository + "/commits/master/src/posts" + slug.slice(0, -1) + ".md"
  const formattedDate = moment(date, "YYYY-MM-DD HH:mm:ss Z").local().format("MMMM Do, YYYY")
  return (
    <>
      <StyledTitle to={slug}>{title}</StyledTitle>
      <Meta><a href={historyLink}>Published {formattedDate}</a> by <a href={data.site.siteMetadata.profileUrl}>Hiroshi Sugawara</a></Meta>
    </>
  )
}

const StyledTitle = styled(props => <Link {...props} />)`
  display: block;
  width: 800px;
  margin: 120px auto 10px;
  text-align: center;
  text-decoration: none;
  @media (max-width: 800px) {
    width: 95%;
  }
`

const Meta = styled.div`
  width: 800px;
  margin: 10px auto 20px;
  font-size: 1.2rem;
  text-align: center;
  @media (max-width: 800px) {
    width: 95%;
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            repository
            profileUrl
          }
        }
      }
`}
    render={data => <Title data={data} {...props} />}
  />
)

