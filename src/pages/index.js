// Step 1: Import React
import * as React from 'react'
import { Link, graphql, } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { bodyBold, characterCardName, quote, characterList, characterCardStyling, indexMain } from '../components/index.module.css'
import Seo from '../components/seo'
import CharacterCard from '../components/characterCard'

// Step 2: Define your component
const IndexPage = ({ data }) => {
 
  return (
    <main className={indexMain}>
      <h2>Deadlands: Worldly Wickedness</h2>
      <h3>Dice Roller</h3>
      <h1 className={bodyBold}>Select your character</h1>

      <div className={characterList}>
      {
        data.allMdx.nodes.map(node => (
            <CharacterCard node={node}></CharacterCard>
        ))
      }
      </div>
    </main>
  )
}


export const query = graphql`
query {
    allMdx {
      nodes {
        frontmatter {
          playerName
          characterName
          slug
          quote
          avatar {
            childImageSharp {
              gatsbyImageData(
                width: 100, 
                height: 100, 
                formats: PNG, 
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
`

export const Head = () => (
  <>
      <Seo pageTitle="Home Page" />
      <meta name="description" content="Your description" />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"></link>
  </>
)

// Step 3: Export your component
export default IndexPage