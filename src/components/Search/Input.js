import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import styled, { css } from "styled-components"
import { Search } from "styled-icons/fa-solid"

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <SearchIcon {...rest} />
    <Input
      type="text"
      onChange={e => refine(e.target.value)}
      {...rest}
    />
  </Form>
))

const Form = styled.form`
  width: 200px;
`

const SearchIcon = styled(Search)`
  width: 2em;
  padding: 0 .5em;
  ${props => props.focused ? focusedIcon : blurredIcon}
`

const blurredIcon = css`
  color: hsl(235, 10%, 40%);
`

const focusedIcon = css`
  color: hsl(235, 10%, 80%);
`

const Input = styled.input`
  font-size: 1em;
  background: transparent;
  margin-left: -2em;
  padding-left: 2em;
  outline: none;
  border: none;
  transition: width .25s ease-out 0s;
  ${props => props.focused ? focusedText : blurredText}
`

const blurredText = css`
  width: 150px;
  color: hsl(235, 10%, 40%);
  border-bottom: 1px solid hsl(235, 10%, 40%);
`

const focusedText = css`
  width: 200px;
  color: hsl(235, 10%, 80%);
  border-bottom: 1px solid hsl(235, 10%, 80%);
  cursor: text;
`
