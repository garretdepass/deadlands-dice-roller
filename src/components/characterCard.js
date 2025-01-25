import * as React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { characterCardName, quote, characterCardStyling } from '../components/characterCard.module.css'

const CharacterCard = ({ node }) => {

    return (
                <div 
                className={characterCardStyling}
                onClick={event =>  window.location.href=`../characters/${node.frontmatter.slug}`} 
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