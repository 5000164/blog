import styled from "styled-components"

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

export default Article
