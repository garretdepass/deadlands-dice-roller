import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { bodyBold, characterCardName, quote, characterList, characterCardStyling, indexMain } from '../components/index.module.css'

const CharacterCard = ({ node }) => {

    return (
                <div 
                onClick={event =>  window.location.href=`../characters/${node.frontmatter.slug}`}
                className={characterCardStyling} 
                key={node.slug} >
                    <GatsbyImage
                    image={getImage(node.frontmatter.avatar)}
                    alt={node.frontmatter.slug} />
                    <p className={characterCardName}>
                        {node.frontmatter.characterName}
                    </p>
                    <p className={quote}>{node.frontmatter.quote}</p>
                </div>
      )

}

export default CharacterCard