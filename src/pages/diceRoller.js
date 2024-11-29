// Step 1: Import React
import * as React from 'react'
import Layout from '../components/layout.js'
import Seo from '../components/seo'

// Step 2: Define your component
const DiceRoller = () => {
  return (
    <Layout pageTitle="Dice Roller">
        <div id="character-sheet">
            this is where the character sheet will go. The cognition trait is...
            <div id="cognition"></div>
        </div>
    </Layout>
  )
}


export const Head = () => (
    <>
      <Seo title="Dice Roller" />
      <meta name="description" content="Your description" />
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"></link>
    </>
  )

// Step 3: Export your component
export default DiceRoller