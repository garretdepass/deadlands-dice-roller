// Step 1: Import React
import * as React from 'react'
import { Link, graphql, } from 'gatsby'
import ChipButton from '../components/chipButton'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/seo'

// Step 2: Define your component
const IndexPage = ({ data }) => {

  return (
    <main>
      <h1>Welcome to my Gatsby site!</h1>
      <ul>
      {
        data.allFile.nodes.map(node => (
          <li key={node.name}>
            <Link to='../pages/diceRoller.js'>{node.name}</Link>
          </li>
        ))
      }

      </ul>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <ChipButton text="test"></ChipButton>
      <StaticImage
        alt="test alt text"
        src="../images/peteyBarnum.png" />
    </main>
  )
}

export const query = graphql`
query MyQuery {
  allFile {
    nodes {
      name
    }
  }
}
`

export const Head = () => (
  <>
      <Seo title="Home Page" />
      <meta name="description" content="Your description" />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"></link>
  </>
)

// Step 3: Export your component
export default IndexPage