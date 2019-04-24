import React from "react"
import PropTypes from "prop-types"
import { graphql, Link, StaticQuery } from "gatsby"
import styled from "styled-components"

const Footer = ({ data }) => (
  <StyledFooter>
    <div><StyledTopLink to="/">{data.site.siteMetadata.title}</StyledTopLink></div>
    <div>Copyright © 2019 Hiroshi Sugawara. All rights reserved.</div>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  margin: 120px auto 20px;
  font-size: 1.2rem;
  text-align: center;
  color: hsl(235, 10%, 65%);
  @media (max-width: 800px) {
    width: 95%;
  }
`

const StyledTopLink = styled(props => <Link {...props} />)`
  display: block;
  margin: 0 0 10px;
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
    render={data => <Footer data={data} {...props} />}
  />
)

Footer.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
