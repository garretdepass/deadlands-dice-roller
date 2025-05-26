import React, { useEffect, useState, useRef } from "react";
import Menu from "./menu.js";
import './stat_upgrade_button.css'

const StatUpgradeButton = ({
    stat, 
    statType, 
    trait, 
    upgradesArray, 
    setUpgradesArray, 
    character, 
    hasEnoughBountyPoints,
    remainingBountyPoints, 
    }) => {
    
    
    const returnButtonText = () => {
        switch (statType) {
            case ("trait"):
                return "..."
                break;
            case ("attribute"):
            case ("concentration"):
                return "+"
                break;
        }
    }
    
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const wrapperRef = useRef(null)
    
    
    const useClickOutside = (ref, onClickOutside) => {
        useEffect(() => {

           const handleClickOutside = (event) => {
               if (ref.current && !ref.current.contains(event.target)) {
                   onClickOutside();
                }
            }
            // Bind
            document.addEventListener("mousedown", handleClickOutside);
            
            return () => {
                // dispose
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref, onClickOutside]);
    }
    
    
    useClickOutside(wrapperRef, () => {
        setIsMenuVisible(false);
      });

    const handleTraitClick = () => {
        isMenuVisible ? setIsMenuVisible(false) : setIsMenuVisible(true);
    }

    const jsonStatIndex = () => {

        for (let traitCounter = 0; traitCounter < character.stats.traits.length; traitCounter ++) {
            const currentTrait = character.stats.traits[traitCounter]
            if (currentTrait.name === stat.name) {
                return(`stats.traits.${traitCounter}`)
            } else if (currentTrait.attributes) { 
                for (let attributeCounter = 0; attributeCounter < currentTrait.attributes.length; attributeCounter ++) {
                    const currentAttribute = currentTrait.attributes[attributeCounter]
                    if (currentAttribute.name === stat.name) {
                        return(`stats.traits.${traitCounter}.attributes.${attributeCounter}`)
                    }
                    else if (currentAttribute.concentrations && currentAttribute.name) {
                        for (let concentrationCounter = 0; concentrationCounter < currentAttribute.concentrations.length; concentrationCounter ++) {
                            const currentConcentration = currentAttribute.concentrations[concentrationCounter];
                            if (currentConcentration.name === stat.name) {
                                return(`stats.traits.${traitCounter}.attributes.${attributeCounter}.concentrations.${concentrationCounter}`)
                            }
                        }
                    }
                } 
            }
        }


               
    }

    const handleAttributeOrConcentrationClick = () => {
        
        const newUpgrade = {
            cost: dieCountUpgradeCost(),
            stat: stat,
            statType: statType,
            jsonStatIndex: jsonStatIndex(),
            upgradeType: "dieCount"
        }
        setUpgradesArray([...upgradesArray, newUpgrade])
    }

    const dieTypeArray = [4, 6, 8, 10, 12, 20, 100]
    const dieSidesUpgradeCost = () => {
        const isCurrentDieType = (element) => element === stat.dieSides
        let currentDieTypeIndex = dieTypeArray.findIndex(isCurrentDieType)
        currentDieTypeIndex ++
        const newDieSides = dieTypeArray[currentDieTypeIndex]
        return newDieSides * 3
    }

    const dieCountUpgradeCost = () => {
        const newDieCount = stat.dieCount + 1;
        if (statType === "trait" || stat.dieCount >= 5) {
            return newDieCount * 2
        } else {
            return newDieCount
        }
    }

    const isButtonDisabled = () => {
        const cost = dieCountUpgradeCost()
        
        if (cost > remainingBountyPoints) {
            return true
        } else {
            return false
        }
    }

    if (statType === "trait") {
        return (
            <div className="stat-upgrade-button-container" ref={wrapperRef}>
                <button className="chip-counter__button" onClick={() => handleTraitClick()} >{returnButtonText()}</button>
                {/* need to make each menu item disable-able if insufficient BP */}
                {isMenuVisible && <Menu 
                                    dieSidesUpgradeCost={dieSidesUpgradeCost()} 
                                    dieCountUpgradeCost={dieCountUpgradeCost()} 
                                    stat={stat} 
                                    upgradesArray={upgradesArray} 
                                    setUpgradesArray={setUpgradesArray} 
                                    statType={statType}
                                    character={character}
                                    jsonStatIndex={jsonStatIndex()}
                                    remainingBountyPoints={remainingBountyPoints}
                                    />
                }
            </div>
        )
    } else {
        return (
            <button className="chip-counter__button" onClick={() => handleAttributeOrConcentrationClick(stat)} disabled={isButtonDisabled()}>{returnButtonText()}</button>
        )
    }
}

export default StatUpgradeButton