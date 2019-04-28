import React from "react"
import { graphql, Link } from "gatsby"

export default function postPage({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const pageNumber = parseInt(frontmatter.path.split('/')[2]);

  return ( 
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <p>{frontmatter.stuff}</p>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Link to="/">Back to home</Link>
        <br />
        { pageNumber !== 1 ? <Link to={`/demo/${pageNumber - 1}`}>Prev</Link> : '' }
        <br />
        <Link to={`/demo/${pageNumber + 1}`}>Next</Link>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        stuff
      }
    }
  }
`