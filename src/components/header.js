import React from "react"
import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import moment from "moment"
import TopPageHeader from "./top-page-header"

const Header = ({ data, topPage, slug, title, date }) => {
  if (topPage) {
    return <TopPageHeader/>
  } else {
    const historyLink = data.site.siteMetadata.repository + "/commits/master/src/pages/articles" + slug.slice(0, -1) + ".md"
    const formattedDate = moment(date).local().format(`MMMM Do, YYYY`)
    return <StyledHeader>
      <StyledTopLink to="/">{data.site.siteMetadata.title}</StyledTopLink>
      <StyledTitleLink to={slug}>{title}</StyledTitleLink>
      <Subtitle><a href={historyLink}>Published {formattedDate}</a> by <a href={data.site.siteMetadata.profileUrl}>Hiroshi Sugawara</a></Subtitle>
    </StyledHeader>
  }
}

const StyledHeader = styled.header`
  margin: 8px 8px 0;
  padding-top: calc(8vw - -180px);
  padding-bottom: calc(8vw - -160px);
  padding-left: 0;
  padding-right: 0;
  text-align: center;
  background: hsl(0, 0%, 16%);
`

const StyledTopLink = styled(props => <Link {...props} />)`
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  font-family: Georgia, serif;
  font-size: 2.6rem;
  letter-spacing: -0.2rem;
  line-height: 1;
`

const StyledTitleLink = styled(props => <Link {...props} />)`
  display: block;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: hsl(0, 100%, 100%);
  text-decoration: none;
  &:visited {
    color: hsl(0, 100%, 100%);
  }
  @media (max-width: 800px) {
    width: 95%;
  }
`

const Subtitle = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 10px auto 0;
  font-size: 1.2rem;
  text-align: center;
  color: hsl(235, 10%, 60%);
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
            title
            repository
            profileUrl
          }
        }
      }
`}
    render={data => <Header data={data} {...props} />}
  />
)

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        profileUrl: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
