import React from "react"
import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"
import Search from "../Search"

const Header = ({ data }) => (
  <StyledHeader>
    <StyledTitleLink to="/">{data.site.siteMetadata.title}</StyledTitleLink>
    <Subtitle>My writing is my life.</Subtitle>
    <About>
      <AboutItem><StyledA href="https://github.com/5000164/profile">About me</StyledA></AboutItem>
      <AboutItem><StyledA href="https://github.com/5000164">GitHub</StyledA></AboutItem>
      <AboutItem><StyledA href="https://twitter.com/5000164">Twitter</StyledA></AboutItem>
    </About>
    <Search/>
  </StyledHeader>
)

const StyledHeader = styled.header`
  width: 200px;
  height: 200px;
  margin: 8px auto;
  text-align: center;
  background: hsl(0, 0%, 16%);
`

const StyledTitleLink = styled(props => <Link {...props} />)`
  display: block;
  height: 50px;
  margin: auto;
  padding-top: 30px;
  font-family: Georgia, serif;
  font-size: 2rem;
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
  height: 50px;
  margin: auto;
  font-size: 1.2rem;
  text-align: center;
  color: hsl(235, 10%, 65%);
  @media (max-width: 800px) {
    width: 95%;
  }
`

const About = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const AboutItem = styled.li`
  line-height: 1.2;
`

const StyledA = styled.a`
  font-size: 1.4rem;
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
    render={data => <Header data={data} {...props} />}
  />
)

Header.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
