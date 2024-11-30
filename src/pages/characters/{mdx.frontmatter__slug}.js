import * as React from 'react'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { graphql } from 'gatsby'

const CharacterSheet = ({ data, children }) => {
    return (
        <Layout pageTitle={data.mdx.frontmatter.characterName}>
            <p>this character is played by {data.mdx.frontmatter.playerName}</p>
            {children}
        </Layout>
    )
}

export const query = graphql`
    query ($id: String) {
  mdx( id: {eq: $id}) {
    frontmatter {
    playerName
    date
      slug
    }
    id
  }
}
  `

export const Head = ({ data }) => <Seo pageTitle={data.mdx.frontmatter.title} />

export default CharacterSheet