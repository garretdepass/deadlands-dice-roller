import * as React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby';
import {header, headerTabs} from './header.module.css'


// I'm able to get this working if it's referencing playername in the header, but
// for some reason it comes through as undefined when it's referencing characterName.
// The alert in {mdx.frontmatter__slug}.js confirms, and is set to characterName too.
const Header = ({ characterName }) => {

    // const data = useStaticQuery(graphql`
    //         query {
    //             site {
    //                 siteMetadata {
    //                 title
    //                 }
    //             }
    //         }
    //     `)
    
    
    return (
        
        <header id="header">
                <h1>{characterName}</h1>
                <div className={headerTabs}>
                    <Link>Dice roller</Link>
                    <Link>Dice roller</Link>
                    <Link>Dice roller</Link>
                    <Link>Dice roller</Link>
                </div>
                <Link to="/">Change character</Link>
            </header>
        )
        
    } 
    
export default Header