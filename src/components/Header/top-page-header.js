import React from "react"
import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import Search from "../Search"

const TopPageHeader = ({ data }) => (
  <StyledHeader>
    <StyledTitleLink to="/">{data.site.siteMetadata.title}</StyledTitleLink>
    <Subtitle>My writing is my life.</Subtitle>
    <About>
      <AboutItem><StyledA href="https://github.com/5000164/profile">About me</StyledA></AboutItem>
      <AboutItem><StyledA href="https://github.com/5000164">GitHub</StyledA></AboutItem>
      <AboutItem><StyledA href="https://twitter.com/5000164">Twitter</StyledA></AboutItem>
    </About>
    <Search topPage={true}/>
  </StyledHeader>
)

const StyledHeader = styled.header`
  margin: 8px 8px 0;
  padding: calc(8vw + 180px) 0 calc(8vw + 40px);
  text-align: center;
  background: hsl(0, 0%, 16%);
`

const StyledTitleLink = styled(props => <Link {...props} />)`
  display: block;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  font-family: Georgia, serif;
  font-size: 2.6rem;
  font-weight: bold;
  text-align: center;
  letter-spacing: -0.2rem;
  line-height: 1;
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

const About = styled.ul`
  list-style-type: none;
  margin: 60px 0 0;
  padding: 0;
`

const AboutItem = styled.li`
  line-height: 1.2;
`

const StyledA = styled.a`
  font-size: 1.6rem;
  line-height: 1;
  text-align: center;
  color: hsl(235, 10%, 80%);
  &:visited {
    color: hsl(235, 10%, 80%);
  }
`

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
`}
    render={data => <TopPageHeader data={data} {...props} />}
  />
)

TopPageHeader.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
