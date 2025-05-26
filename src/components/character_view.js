// import { forEach } from "cypress/types/lodash";
import {React, useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import RollPanel from "./roll_panel.js";
import ChipCounterContainer from "./chip_counters_container.js";
import StatUpgradeButton from "./stat_upgrade_button.js";
import SpendBountyPointsPanel from "./spend_bounty_points_panel.js";
import './character_view.css';


const CharacterView = ({character, characterIndex}) => {

    const [currentCharacter, setCurrentCharacter] = useState(character)
    const [isSpendingBountyPoints, setIsSpendingBountyPoints] = useState(false)
    const [spendButtonText, setSpendButtonText] = useState("Spend")
    const [statUpgradeButton, setStatUpgradeButton] = useState(null)
    const [upgradesArray, setUpgradesArray] = useState([])
    const [hasEnoughBountyPoints, setHasEnoughBountyPoints] = useState(true)
    const [remainingBountyPoints, setRemainingBountyPoints] = useState(character.bountyPoints)
    
    useEffect (() => {

        const fetchData = async () => {
            const response = await fetch('/.netlify/functions/get_characters');
            const data = await response.json();
            setCurrentCharacter(data[characterIndex]);
        };
        fetchData();
        
    }, [upgradesArray])


    useEffect(() => {
        
        if (isSpendingBountyPoints) {
            setSpendButtonText("Stop Spending")
        } else {
            setSpendButtonText("Spend")
        }
        
        if (currentCharacter) {
            const updatedCharacterSheet = renderCharacterSheet(currentCharacter)
            setCharacterSheet(updatedCharacterSheet);
        }
    }, [currentCharacter, isSpendingBountyPoints, upgradesArray])

    
    
    const [statNameToRoll, setStatNameToRoll] = useState("")
    const [dieCountToRoll, setDieCountToRoll] = useState("")
    const [dieSidesToRoll, setDieSidesToRoll] = useState("")


    const returnTotalWind = () => {
        const spiritIndex = currentCharacter.stats.traits.findIndex((object) => object.name === "Spirit");
        const vigorIndex = currentCharacter.stats.traits.findIndex((object) => object.name === "Vigor");
        return (
            currentCharacter.stats.traits[spiritIndex].dieSides + currentCharacter.stats.traits[vigorIndex].dieSides
        )
    }
    
    const generateKey = () => `${Date.now()}-${Math.random()}`;

    const handleStatClick = (clickedStat, clickedTrait) => {
        setStatNameToRoll(clickedStat.name)
        setDieCountToRoll(clickedStat.dieCount)
        setDieSidesToRoll(clickedTrait.dieSides)
    }
    
    const handleClickSpend = () => {
        if (isSpendingBountyPoints) {
            setIsSpendingBountyPoints(false);
            setStatUpgradeButton(null)
        } else {
            setIsSpendingBountyPoints(true)
            setStatUpgradeButton(<StatUpgradeButton />)
        }
    }





    const renderStat = (stat, statType, trait, className) => {

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
                        {isSpendingBountyPoints && <StatUpgradeButton 
                                                            stat={stat} 
                                                            statType={statType} 
                                                            trait={trait} 
                                                            upgradesArray={upgradesArray} 
                                                            setUpgradesArray={setUpgradesArray} 
                                                            character={character}
                                                            remainingBountyPoints={remainingBountyPoints}
                                                    />
                        }
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
                            {isSpendingBountyPoints && <StatUpgradeButton 
                                                            stat={stat} 
                                                            statType={statType} 
                                                            trait={trait} 
                                                            upgradesArray={upgradesArray} 
                                                            setUpgradesArray={setUpgradesArray} 
                                                            character={character}
                                                            remainingBountyPoints={remainingBountyPoints}
                                                        />
                            }
                    </div>
                )
        }
    }



    const renderStatGroup = (traitName) => {
        const traitIndex = currentCharacter.stats.traits.findIndex((object) => object.name === traitName)
        const trait = currentCharacter.stats.traits[traitIndex]
        return (
            <div className={traitName === "Knowledge" ? "stat-group stat-group_knowledge" : "stat-group"}>
                    {renderStat(trait, "trait", trait, "stat-group__item_stat")}
                <div className="stat-group__list">
                    {Array.isArray(trait.attributes) && trait.attributes.map(
                        attribute => 
                            <div className="stat-group__item-container" key={generateKey()}>
                            {renderStat(attribute, "attribute", trait, "stat-group__item_attribute")}
                            <div className="stat-group__list">
                                {Array.isArray(attribute.concentrations) && attribute.concentrations.map(
                                    concentration => 
                                        renderStat(concentration, "concentration", trait, "stat-group__item_concentration")
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )                        
    }



    const renderCharacterSheet = () => {
        return (
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
        )
    }

    const [characterSheet, setCharacterSheet] = useState(renderCharacterSheet())

    return (
        <div className="view">
            <header className="header">
                <div className="character-indicator">
                    <div className="character-indicator__image-container">
                        <img className="character-indicator__image" src={currentCharacter.imageSrc} />
                    </div>
                    <div className="character-indicator__name-container">
                        <span className="character-indicator__name">
                            {currentCharacter.name} 
                        </span>
                        <Link className="character-indicator__change-character" to="/">Change Character</Link>
                    </div>
                </div>
                <nav className="nav">
                    {/* <div>Stats and Attributes</div> */}
                    <div className="non-rollable-stats__bounty-points">
                        Bounty Points: <span className="stat-accent-color">{currentCharacter.bountyPoints}</span>
                        <button id="spendButton" className="button button__button-secondary" onClick={handleClickSpend}>{spendButtonText}</button>
                    </div>
                    {/* <div>nav element</div>
                    <div>nav element</div> */}
                </nav>
            </header>
            <div className="non-rollable-stats">
                <div className="non-rollable-stats__inner-left">
                    <div>Grit: <span className="stat-accent-color">{currentCharacter.stats.grit}</span></div>
                    <div>Pace: <span className="stat-accent-color">{currentCharacter.stats.pace}</span></div>
                    <div>Size: <span className="stat-accent-color">{currentCharacter.stats.size}</span></div>
                    <div >Wind: <span className="stat-accent-color">{returnTotalWind()}</span></div>
                </div>
                <div className="non-rollable-stats__inner-left">
                    <ChipCounterContainer character={currentCharacter}/>
                </div>

            </div>
            <div className="horizontal-block">
                {characterSheet}
                {isSpendingBountyPoints ? 
                    <SpendBountyPointsPanel 
                        upgradesArray={upgradesArray} 
                        setUpgradesArray={setUpgradesArray} 
                        character={currentCharacter}
                        hasEnoughBountyPoints={hasEnoughBountyPoints}
                        setHasEnoughBountyPoints={setHasEnoughBountyPoints}
                        remainingBountyPoints={remainingBountyPoints}
                        setRemainingBountyPoints={setRemainingBountyPoints}/> 
                    : <RollPanel 
                        statNameToRoll={statNameToRoll} 
                        dieCountToRoll={dieCountToRoll} 
                        dieSidesToRoll={dieSidesToRoll} />}
            </div>
        </div>
            )


}

export default CharacterView