import * as React from 'react';
import Seo from '../../components/seo';
import { graphql } from 'gatsby';
import CharacterStats from '../../components/characterStats';
import RunningWolf from '../../../character-sheets/runningWolf';
import Petey from '../../../character-sheets/petey';
import '../../root.css'
import Header from '../../components/header';
import { playerMainView, layoutPanelLeft, layoutPanelRight, diceRoller,chipsAndTips } from '../../components/layout.module.css'
import ChipButton from '../../components/chipComponents/chipButton';
import ChipCounter from '../../components/chipComponents/chipCounter';
import Tips from '../../components/tips';
import RollRow from '../../components/rollControlComponents/rollRow';

const CharacterSheet = ({ data, children }) => {

  let currentCharacter;
  if (data.mdx.frontmatter.playerName === "Bronwen Abbattista") {
    currentCharacter = RunningWolf;
  } else {
    currentCharacter = Petey;
  };

  return (
    <div className={playerMainView} data={data} avatar={data.mdx.frontmatter.avatar} pageTitle={data.mdx.frontmatter.characterName}>
          <Header id="header" characterName={data.mdx.frontmatter.characterName}></Header>
          <div id="diceRoller" className={diceRoller}>
            <div className={layoutPanelLeft}>
              <CharacterStats character={currentCharacter}/>
              <div class="custom roller">I am a custom roller panel</div>
            </div>
            <div class={layoutPanelRight}>
                <div class="rolling section">
                  <RollRow sides='8' dieCount='3'/>
                  <button>Roll</button>
                </div>
                <div className={chipsAndTips}>
                    <ChipCounter />
                    <Tips />
                </div>
            </div>
          </div>
          {alert("testing passing characterName as a prop in {mdx.frontmatter__slug}.js to try and get something working in header.js: " + data.mdx.frontmatter.characterName)}
      </div>
  );
  
  
}

export const query = graphql`
query ($id: String) {
  mdx( id: {eq: $id}) {
    frontmatter {
      playerName
      date
      slug
      avatar {
        childImageSharp {
          gatsbyImageData(height: 100, width: 100, placeholder: BLURRED)
          }
          }
          }
    id
  }
}
  `

export const Head = ({ data }) => <Seo pageTitle={data.mdx.frontmatter.title} />

export default CharacterSheet