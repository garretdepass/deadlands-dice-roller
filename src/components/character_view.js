// import { forEach } from "cypress/types/lodash";
import {React, useState} from "react";
import { Link } from 'react-router-dom';
import RollPanel from "./roll_panel.js";
import ChipCounterContainer from "./chip_counters_container.js";
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

    const renderStat = (stat, trait, className) => {
        switch (stat.name) {
            case ("Language"):
            case ("Area Knowledge"):
                return (
                    <div key={stat.name} className="stat-group__item-non-rollable">{stat.name}</div>
                )
                break;
            case ("Home County"):
                return (
                    <div key={stat.name} className={`stat-group__item ${className}`} onClick={() => handleStatClick(stat, trait)}>
                    <div className="stat-group__item-name">
                        {stat.location} 
                    </div>
                    <div className="stat-group__item-die-info">
                        <span className="stat-accent-color">
                            {stat.dieCount} 
                        </span>
                        d
                        <span className="stat-accent-color">
                            {trait.dieSides}
                        </span>
                    </div>
                </div>
                )
            default:
                return (
                    <div key={stat.name} className={`stat-group__item ${className}`} onClick={() => handleStatClick(stat, trait)}>
                    <div className="stat-group__item-name">
                        {stat.name} 
                    </div>
                    <div className="stat-group__item-die-info">
                        <span className="stat-accent-color">
                            {stat.dieCount} 
                        </span>
                        d
                        <span className="stat-accent-color">
                            {trait.dieSides}
                        </span>
                    </div>
                </div>
                )
        }
    }

    // const renderStat = (stat, trait, className) => {
    //     if (stat.name === "Language" || stat.name === "Area Knowledge") {
    //         return (
    //             <div className="stat-group__item-non-rollable">{stat.name}</div>
    //         )
    //     } else {
    //         return (
    //             <div key={generateKey()} className={`stat-group__item ${className}`} onClick={() => handleStatClick(stat, trait)}>
    //             <div className="stat-group__item-name">
    //                 {stat.name} 
    //             </div>
    //             <div className="stat-group__item-die-info">
    //                 <span className="stat-accent-color">
    //                     {stat.dieCount} 
    //                 </span>
    //                 d
    //                 <span className="stat-accent-color">
    //                     {trait.dieSides}
    //                 </span>
    //             </div>
    //         </div>
    //         )
    //     }
    // }

    const returnTotalWind = () => {
        const spiritIndex = character.stats.traits.findIndex((object) => object.name === "Spirit");
        const vigorIndex = character.stats.traits.findIndex((object) => object.name === "Vigor");
        return (
            character.stats.traits[spiritIndex].dieSides + character.stats.traits[vigorIndex].dieSides
        )
    }

    const renderStatGroup = (traitName) => {
        const traitIndex = character.stats.traits.findIndex((object) => object.name === traitName)
        const trait = character.stats.traits[traitIndex]
        return (
            <div className={traitName === "Knowledge" ? "stat-group stat-group_knowledge" : "stat-group"}>
                    {renderStat(trait, trait, "stat-group__item_stat")}
                <div className="stat-group__list">
                    {Array.isArray(trait.attributes) && trait.attributes.map(
                        attribute => 
                            <div className="stat-group__item-container" key={generateKey()}>
                            {renderStat(attribute, trait, "stat-group__item_attribute")}
                            <div className="stat-group__list">
                                {Array.isArray(attribute.concentrations) && attribute.concentrations.map(
                                    concentration => renderStat(concentration, trait, "stat-group__item_concentration")
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )                        
    }


    return (
        <div className="view">
            <header className="header">
                <div className="character-indicator">
                    <div className="character-indicator__image-container">
                        <img className="character-indicator__image" src={character.imageSrc} />
                    </div>
                    <div className="character-indicator__name-container">
                        <span className="character-indicator__name">
                            {character.name} 
                        </span>
                        <Link className="character-indicator__change-character" to="/">Change Character</Link>
                    </div>
                </div>
                <nav className="nav">
                    <div>nav element</div>
                    <div>nav element</div>
                    <div>nav element</div>
                </nav>
            </header>
            <div className="non-rollable-stats">
                <div className="non-rollable-stats__inner-left">
                    <div>Grit: <span className="stat-accent-color">{character.stats.grit}</span></div>
                    <div>Pace: <span className="stat-accent-color">{character.stats.pace}</span></div>
                    <div>Size: <span className="stat-accent-color">{character.stats.size}</span></div>
                    <div >Wind: <span className="stat-accent-color">{returnTotalWind()}</span></div>
                </div>
                <div className="non-rollable-stats__inner-left">
                    <ChipCounterContainer character={character}/>
                </div>

            </div>
            <div className="horizontal-block">
                <div className="panel character-sheet">
                    <div className="character-sheet__inner">
                        {renderStatGroup(`Cognition`)}
                        {renderStatGroup(`Deftness`)}
                        {renderStatGroup(`Mien`)}
                        {renderStatGroup(`Knowledge`)}
                        {renderStatGroup(`Smarts`)}
                        {renderStatGroup(`Nimbleness`)}
                        <div className="stat-set">
                            {renderStatGroup(`Quickness`)}
                            {renderStatGroup(`Spirit`)}
                            {renderStatGroup(`Strength`)}
                            {renderStatGroup(`Vigor`)}
                        </div>
                    </div>
                </div>
                <RollPanel statNameToRoll={statNameToRoll} dieCountToRoll={dieCountToRoll} dieSidesToRoll={dieSidesToRoll} />
            </div>
        </div>
            )


}

export default CharacterView