import React, { Component, createRef } from "react"
import algoliasearch from "algoliasearch/lite"
import { connectStateResults, Hits, Index, InstantSearch } from "react-instantsearch-dom"
import styled, { css } from "styled-components"
import { Algolia } from "styled-icons/fa-brands/Algolia"
import Input from "./Input"
import PostHit from "./PostHit"

const events = ["mousedown", "touchstart"]

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits ? children : `No results for ${state.query}`,
)

export default class Search extends Component {
  state = { query: "", focused: false, ref: createRef() }
  searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  )

  updateState = state => this.setState(state)

  focus = () => {
    this.setState({ focused: true })
  }

  disableHits = () => {
    this.setState({ focused: false })
  }

  handleClickOutside = event => {
    if (!this.state.ref.current.contains(event.target)) {
      this.setState({ focused: false })
    }
  }

  componentDidMount() {
    events.forEach(event =>
      document.addEventListener(event, this.handleClickOutside),
    )
  }

  componentWillUnmount() {
    events.forEach(event =>
      document.removeEventListener(event, this.handleClickOutside),
    )
  }

  render() {
    const { query, focused, ref } = this.state
    const index = "Posts"

    return (
      <InstantSearch
        searchClient={this.searchClient}
        indexName={index}
        onSearchStateChange={this.updateState}
        root={{ Root, props: { ref } }}
      >
        <Input onFocus={this.focus} {...{ focused }} />
        <HitsWrapper show={query.length > 0 && focused}>
          <Index key={index} indexName={index}>
            <Results>
              <Hits hitComponent={PostHit(this.disableHits)}/>
            </Results>
          </Index>
          <By>Powered by<a href="https://www.algolia.com"><StyledAlgolia/>Algolia</a></By>
        </HitsWrapper>
      </InstantSearch>
    )
  }
}

const Root = styled.div`
  position: relative;
`

const HitsWrapper = styled.div`
  position: absolute;
  top: calc(100% + 0.5em);
  left: -200px;
  right: 0;
  visibility: ${props => props.show ? "visible" : "hidden"};
  opacity: ${props => props.show ? "1" : "0"};
  width: 600px;
  max-height: 500px;
  margin: 0 auto;
  background-color: hsl(0, 100%, 100%);
  border-radius: 3px;
  border: 1px solid hsl(0, 0%, 95%);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  transition: ${props => (props.show ?
  "visibility 0s ease-out 0s, opacity .25s ease-out 0s" :
  "visibility 0s ease-out .25s, opacity .25s ease-out 0s")};
  @media (max-width: 800px) {
    width: 95%;
  }
  ${() => hits}
`

const hits = css`
  ul {
    width: 600px;
    list-style: none;
    padding: 0;
  }
  @media (max-width: 800px) {
    ul {
      width: 95%;
    }
  }
`

const By = styled.div`
  font-size: .8em;
  text-align: right;
`

const StyledAlgolia = styled(props => <Algolia {...props} />)`
  width: calc(1em + 6px);
  padding: 0 2px 0 4px;
`
