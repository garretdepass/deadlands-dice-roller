// import { forEach } from "cypress/types/lodash";
import {React, useState} from "react";
import { Link } from 'react-router-dom';
import RollPanel from "./roll_panel.js";
import './character_view.css';

const CharacterView = ({character}) => {
    
    const [statNameToRoll, setStatNameToRoll] = useState("")
    const [dieCountToRoll, setDieCountToRoll] = useState("")
    const [dieSidesToRoll, setDieSidesToRoll] = useState("")

    const handleStatClick = (clickedStat, clickedTrait) => {
        setStatNameToRoll(clickedStat.name)
        setDieCountToRoll(clickedStat.dieCount)
        setDieSidesToRoll(clickedTrait.dieSides)
    }

    const generateKey = () => `${Date.now()}-${Math.random()}`;
    

    const returnStats = (stat, trait) => {
        return (
            <div key={stat.name} className="stat" onClick={() => handleStatClick(stat, trait)}>
                {stat.name} {stat.dieCount}d{trait.dieSides}
            </div>
        )
    }

    const returnTotalWind = () => {
        const spiritIndex = character.stats.traits.findIndex((object) => object.name === "Spirit");
        const vigorIndex = character.stats.traits.findIndex((object) => object.name === "Vigor");
        return (
            character.stats.traits[spiritIndex].dieSides + character.stats.traits[vigorIndex].dieSides
        )
    }


    return (
        <div>
            <RollPanel statNameToRoll={statNameToRoll} dieCountToRoll={dieCountToRoll} dieSidesToRoll={dieSidesToRoll} />
            <div>{character.name} <Link to="/">Change Character</Link></div>            
            <div>Grit: {character.stats.grit}</div>
            <div>Pace: {character.stats.pace}</div>
            <div>Size: {character.stats.size}</div>
            <div >Wind: {returnTotalWind()} </div>
            {character.stats.traits.map(
                trait =>  
                <div key={generateKey()}>
                    {returnStats(trait, trait)}

                    {Array.isArray(trait.attributes) && trait.attributes.map(
                        attribute => <div key={generateKey()}>
                            {returnStats(attribute, trait)}
                        
                        {Array.isArray(attribute.concentrations) && attribute.concentrations.map(
                            concentration => <div key={generateKey()}>
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
        </div>
            )


}

export default CharacterView