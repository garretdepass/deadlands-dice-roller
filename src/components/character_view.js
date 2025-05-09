// import { forEach } from "cypress/types/lodash";
import React from "react";
import { Link } from 'react-router-dom';

const CharacterView = ({character}) => {


const returnStats = (stat, trait) => {
    return (
        <div>
            {stat.name} {stat.dieCount}d{trait.dieSides}
        </div>
    )
}

const returnTotalWind = () => {
    const spiritIndex = character.stats.traits.findIndex((object) => object.name === "Spirit");
    const vigorIndex = character.stats.traits.findIndex((object) => object.name === "Vigor");
    console.log(`the index of spirit is ${spiritIndex}`);
    return (
        character.stats.traits[spiritIndex].dieSides + character.stats.traits[vigorIndex].dieSides
    )
}

    return (
        <div>
            <div>{character.name}</div>
            <div>Grit: {character.stats.grit}</div>
            <div>Pace: {character.stats.pace}</div>
            <div>Size: {character.stats.size}</div>
            <div>Wind: {returnTotalWind()} </div>
            <br></br>
            {character.stats.traits.map(
                trait =>  
                <div>
                    {returnStats(trait, trait)}

                    {Array.isArray(trait.attributes) && trait.attributes.map(
                        attribute => <div>
                            {returnStats(attribute, trait)}
                        
                        {Array.isArray(attribute.concentrations) && attribute.concentrations.map(
                            concentration => <div>
                                {returnStats(concentration, trait)}
                            </div>
                        )
                        }
                        </div>
                    )
                    }               
                        
                    <br></br>
                </div>
            )
            }                
            <Link to="/">Change Character</Link>
        </div>
            )


}

export default CharacterView