// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout.js'
import Seo from '../components/seo'
import { useStaticQuery, graphql } from 'gatsby'

// Step 2: Define your component
const DiceRoller = ({ data }) => {
  return (
    <Layout pageTitle="Dice Roller">
        <div id="character-sheet">
            {
              data.allMdx.nodes.map((node) => (
                <article key={node.id}>
                  <h2>{node.frontmatter.playerName}</h2>
                  <p>Posted: {node.frontmatter.date}</p>
                  <p>{node.excerpt}</p>
                </article>
              ))
            }
        </div>
    </Layout>
  )
}

export const query = graphql`
query {
  allMdx {
    nodes {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        playerName
        slug
      }
      excerpt
      id
    }
  }
}
`

export const Head = () => (
    <>
      <Seo pageTitle="Dice Roller" />
      <meta name="description" content="Your description" />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"></link>
    </>
  )

// Step 3: Export your component
export default DiceRoller