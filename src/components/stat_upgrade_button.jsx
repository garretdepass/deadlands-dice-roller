import React, { useEffect, useState, useRef } from "react";
import Menu from "./menu";
import "./stat_upgrade_button.css";

const StatUpgradeButton = ({
  stat,
  statType,
  trait,
  upgradesArray,
  setUpgradesArray,
  character,
  hasEnoughBountyPoints,
  remainingBountyPoints,
  setRemainingBountyPoints,
}) => {
  const returnButtonText = () => {
    switch (statType) {
      case "trait":
        return "...";
        break;
      case "attribute":
      case "concentration":
        return "+";
        break;
    }
  };

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleTraitClick = () => {
    isMenuVisible ? setIsMenuVisible(false) : setIsMenuVisible(true);
  };

  const jsonStatIndex = () => {
    for (
      let traitCounter = 0;
      traitCounter < character.stats.traits.length;
      traitCounter++
    ) {
      const currentTrait = character.stats.traits[traitCounter];
      if (currentTrait.name === stat.name) {
        return `stats.traits.${traitCounter}`;
      } else if (currentTrait.attributes) {
        for (
          let attributeCounter = 0;
          attributeCounter < currentTrait.attributes.length;
          attributeCounter++
        ) {
          const currentAttribute = currentTrait.attributes[attributeCounter];
          if (currentAttribute.name === stat.name) {
            return `stats.traits.${traitCounter}.attributes.${attributeCounter}`;
          } else if (currentAttribute.concentrations && currentAttribute.name) {
            for (
              let concentrationCounter = 0;
              concentrationCounter < currentAttribute.concentrations.length;
              concentrationCounter++
            ) {
              const currentConcentration =
                currentAttribute.concentrations[concentrationCounter];
              if (currentConcentration.name === stat.name) {
                return `stats.traits.${traitCounter}.attributes.${attributeCounter}.concentrations.${concentrationCounter}`;
              }
            }
          }
        }
      }
    }
  };

  const popover = document.getElementById("insufficientBountPointsPopover");

  const handleAttributeOrConcentrationClick = () => {
    const cost = dieCountUpgradeCost();
    if (cost <= remainingBountyPoints) {
      const newUpgrade = {
        cost: dieCountUpgradeCost(),
        stat: stat,
        statType: statType,
        jsonStatIndex: jsonStatIndex(),
        upgradeType: "dieCount",
      };

      setUpgradesArray((previousArray) => [...previousArray, newUpgrade]);
      setRemainingBountyPoints((previousValue) => previousValue - cost);
    } else {
      popover.showPopover();
    }
  };

  const dieTypeArray = [4, 6, 8, 10, 12, 20, 100];
  const dieSidesUpgradeCost = () => {
    const isCurrentDieType = (element) => element === stat.dieSides;
    let currentDieTypeIndex = dieTypeArray.findIndex(isCurrentDieType);
    currentDieTypeIndex++;
    const newDieSides = dieTypeArray[currentDieTypeIndex];
    return newDieSides * 3;
  };

  const dieCountUpgradeCost = () => {
    const newDieCount = stat.dieCount + 1;
    if (statType === "trait" || stat.dieCount >= 5) {
      return newDieCount * 2;
    } else {
      return newDieCount;
    }
  };

  const isButtonDisabled = () => {
    const cost = dieCountUpgradeCost();

    if (cost > remainingBountyPoints) {
      return true;
    } else {
      return false;
    }
  };

  const cost = (upgradeType) => {
    if (upgradeType === "dieCount") {
      return dieCountUpgradeCost;
    } else if (upgradeType === "dieSides") {
      return dieSidesUpgradeCost;
    }
  };

  const handleMenuUpgradeClick = (upgradeType) => {
    let upgradeCost;
    if (cost(upgradeType) > remainingBountyPoints) {
      popover.showPopover();
    } else {
      if (upgradeType === "dieCount") {
        upgradeCost = dieCountUpgradeCost;
      } else {
        upgradeCost = dieSidesUpgradeCost;
      }

      const newUpgrade = {
        cost: upgradeCost,
        stat: stat,
        jsonStatIndex: jsonStatIndex,
        upgradeType: upgradeType,
      };
      setUpgradesArray([...upgradesArray, newUpgrade]);
      setRemainingBountyPoints((previousValue) => previousValue - upgradeCost);
    }
  };

  if (statType === "trait") {
    return (
      <div
        className="stat-upgrade-button-container"
        // ref={wrapperRef}
      >
        <button
          className="chip-counter__button"
          onClick={() => handleTraitClick()}
        >
          {returnButtonText()}
        </button>
        {isMenuVisible && (
          <Menu setIsMenuVisible={setIsMenuVisible}>
            <div
              className="menu__menu-item"
              onClick={() => {
                handleMenuUpgradeClick("dieCount");
              }}
            >
              <div className="menu__menu-item-label">Add an additional die</div>
              <div className="menu__menu-item-cost">{dieCountUpgradeCost}</div>
            </div>
            <div
              className="menu__menu-item"
              onClick={() => {
                handleMenuUpgradeClick("dieSides");
              }}
            >
              <div className="menu__menu-item-label">Upgrade die type</div>
              <div className="menu__menu-item-cost">{dieSidesUpgradeCost}</div>
            </div>
          </Menu>
        )}
      </div>
    );
  } else {
    return (
      <>
        <button
          className="chip-counter__button"
          onClick={() => handleAttributeOrConcentrationClick(stat)}
        >
          {returnButtonText()}
        </button>
      </>
    );
  }
};

export default StatUpgradeButton;
