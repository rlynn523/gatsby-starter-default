import React from "react"
import { StaticQuery, graphql } from "gatsby"

const Swapi = () => (
  <StaticQuery
    query={graphql`
      query SwapiCharactersQuery {
        charactersdata {
          results {
            name
          }
        }
      }
    `}
    render={({ charactersdata }) => (
      <ul>
        {
          charactersdata.results.map(d => <li>{d.name}</li>)
        }
      </ul>
    )}
  />
)

export default Swapi