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
    

    const returnStats = (stat, trait, className) => {
        return (
            <div key={generateKey()} className={`.stat-group__item ${className}`} onClick={() => handleStatClick(stat, trait)}>
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
        <div className="view">
            <header className="header">
                <div className="header__character-name">
                    <div className="header__character-image-container">
                        <img className="header__character-image" src={character.imageSrc} />
                    </div>
                    {character.name} 
                    <Link to="/">Change Character</Link>
                </div>
                <nav className="nav">
                    <div>nav element</div>
                    <div>nav element</div>
                    <div>nav element</div>
                </nav>
            </header>
            <div className="non-rollable-stats">
                <div className="non-rollable-stats__inner-left">
                    <div>Grit: {character.stats.grit}</div>
                    <div>Pace: {character.stats.pace}</div>
                    <div>Size: {character.stats.size}</div>
                    <div >Wind: {returnTotalWind()} </div>
                </div>
                <div className="non-rollable-stats__inner-left">Fate chip section</div>

            </div>
            <div className="horizontal-block">
                <div className="panel character-sheet">
                    <div className="character-sheet__inner">
                    {character.stats.traits.map(
                        trait =>  
                        <div className="stat-group" key={generateKey()}>
                            {returnStats(trait, trait, "stat-group__item_stat")}
                            <div className="stat-group__list">
                            {Array.isArray(trait.attributes) && trait.attributes.map(
                                attribute => <div key={generateKey()}>
                                    {returnStats(attribute, trait, "stat-group__item_attribute")}
                                <div className="stat-group__list">
                                {Array.isArray(attribute.concentrations) && attribute.concentrations.map(
                                    concentration => returnStats(concentration, trait, "stat-group__item_concentration")
                                )}
                                </div>
                                </div>
                            )
                            }
                            </div>               
                        </div>
                    )} 
                    </div>
                </div>
                <RollPanel statNameToRoll={statNameToRoll} dieCountToRoll={dieCountToRoll} dieSidesToRoll={dieSidesToRoll} />
            </div>
        </div>
            )


}

export default CharacterView