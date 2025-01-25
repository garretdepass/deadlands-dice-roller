import React, { useState } from "react";
import WindCounter from "./windCounter";
import { 
    characterStats,
    topLevelStatsContainer,
    mainStatsContainer,
    topLevelStat,
    rowName,
    traitName,
    traitSection,
    traitContainer,
    statValue, 
    attributeList,
    attributeContainer, 
    concentrationContainer,
    hover,
    dieCountContainer,
    untrained,
    hidden,
    dieIconContainer
    } from './characterStats.module.css';
import '../root.css'

const CharacterStats = ({character}) => {

    const [hoveredItemId, setIsHoveredItemId] = useState(null);
    const handleMouseEnter = (name) => {
        setIsHoveredItemId(name);
    }
    const handleMouseLeave = () => {
        setIsHoveredItemId(null);
    }
    
    return (

        <div className={characterStats}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&icon_names=ifl" />
            <div className={topLevelStatsContainer}>
                <div className={topLevelStat}>Grit: <span className={statValue}>{character.grit}</span></div>
                <div className={topLevelStat}>Pace: <span className={statValue}>{character.pace}</span></div>
                <div className={topLevelStat}>Size: <span className={statValue}>{character.size}</span></div>
                <div className={topLevelStat}><WindCounter totalWind={character.wind}/></div>
            </div>
            <div className={mainStatsContainer}>                
                {character.trait.map((trait) => {
                    return (
                        <ul className={traitSection}>
                            <li className={traitContainer}
                            key={trait.name} 
                            onMouseEnter={() => handleMouseEnter(trait.name)}
                            onMouseLeave={handleMouseLeave}
                            >
                                <div className={dieIconContainer}>
                                    <span style={{ display: hoveredItemId === trait.name ? "inline" : "none" }} className={"material-symbols-outlined"}>ifl</span>
                                </div>
                                <div className={traitName}>{trait.name}</div>
                                <div className={statValue}>{trait.dieCount}</div>
                                <div>d<span className={statValue}>{trait.dieSides}</span></div>
                            </li>
                            <ul className={attributeList}>
                                {trait.attribute?.map((attribute) => {
                                    
                                    return (
                                        <>
                                        <li 
                                        className={attributeContainer}
                                        key={attribute.name}
                                        onMouseEnter={() => handleMouseEnter(attribute.name)}
                                        onMouseLeave={handleMouseLeave}
                                        >
                                            <div className={dieIconContainer}>
                                                <span style={{ display: hoveredItemId === attribute.name ? "inline" : "none" }} className={"material-symbols-outlined"}>ifl</span>
                                            </div>
                                            <div className={rowName}>{attribute.name}</div>
                                            <div className={`${dieCountContainer} + ${attribute.dieCount === 0 ? untrained : ""}`}>
                                                <div className={statValue}>{attribute.dieCount}</div>
                                                <div>d<span className={statValue}>{attribute.dieSides}</span></div>
                                            </div>
                                        </li>
                                        {attribute.concentration?.map((concentration) => {
                                            
                                            return (
                                                <li 
                                                className={concentrationContainer}
                                                key={concentration.name}
                                                onMouseEnter={() => handleMouseEnter(concentration.name)}
                                                onMouseLeave={handleMouseLeave}
                                                >
                                                    <div className={dieIconContainer}>
                                                        <span style={{ display: hoveredItemId === concentration.name ? "inline" : "none" }} className={"material-symbols-outlined"}>ifl</span>
                                                    </div>
                                                    <div className={rowName}>{concentration.name}</div>
                                                    <div className={`${dieCountContainer} + ${attribute.dieCount === 0 ? untrained : ""}`}>
                                                        <div className={statValue}>{concentration.dieCount}</div>
                                                        <div>d<span className={statValue}>{concentration.dieSides}</span></div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                    </>

                                    );
                                    
                                })}
                            </ul>
                        </ul>
                    );
                })}
            </div>
        </div>
    );

};

export default CharacterStats;