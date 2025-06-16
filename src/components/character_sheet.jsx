import { React, useState, useEffect, useContext } from "react";
import ChipCounterContainer from "./chip_counters_container";
import StatUpgradeButton from "./stat_upgrade_button";
import { CharacterContext } from "../contexts/characterContext";
import "./character_sheet.css";

const CharacterSheet = ({
  isSpendingBountyPoints,
  bountyPoints,
  setBountyPoints,
  setStatNameToRoll,
  setDieSidesToRoll,
  setDieCountToRoll,
  setIsSpendingBountyPoints,
  upgradesArray,
  setUpgradesArray,
  remainingBountyPoints,
  setRemainingBountyPoints,
  characterIndex,
}) => {
  const [character, setCharacter] = useState(useContext(CharacterContext));
  const [spendButtonText, setSpendButtonText] = useState("Spend");

  useEffect(() => {
    if (character) {
      const updatedCharacterSheet = renderCharacterSheet(character);
      setCharacterSheet(updatedCharacterSheet);
    }
    const fetchData = async () => {
      const response = await fetch("/.netlify/functions/get_characters");
      const data = await response.json();
      setCharacter(data[characterIndex]);
    };
    fetchData();
  }, [isSpendingBountyPoints, upgradesArray]);

  //   useEffect(() => {}, [upgradesArray]);

  const returnTotalWind = () => {
    const spiritIndex = character.stats.traits.findIndex(
      (object) => object.name === "Spirit"
    );
    const vigorIndex = character.stats.traits.findIndex(
      (object) => object.name === "Vigor"
    );
    return (
      character.stats.traits[spiritIndex].dieSides +
      character.stats.traits[vigorIndex].dieSides
    );
  };
  const [currentWind, setCurrentWind] = useState(returnTotalWind);

  const generateKey = () => `${Date.now()}-${Math.random()}`;

  const handleStatClick = (clickedStat, clickedTrait) => {
    const rollPanel = document.getElementsByClassName("roll-panel")[0];
    const windowSize = window.innerWidth;
    if (windowSize < 724 && !isSpendingBountyPoints) {
      rollPanel.classList.add("roll-panel__mobile-active");
    }
    setStatNameToRoll(clickedStat.name);
    setDieCountToRoll(clickedStat.dieCount);
    setDieSidesToRoll(clickedTrait.dieSides);
  };

  const handleClickSpend = () => {
    const chipCountersContainer = document.querySelector(
      ".chip-counters-container"
    );
    const nonRollableInnerLeft = document.querySelector(
      ".non-rollable-stats__inner-left"
    );
    const windowSize = window.innerWidth;

    if (!isSpendingBountyPoints) {
      setIsSpendingBountyPoints(true);
      setSpendButtonText("Stop Spending");
      chipCountersContainer.style.display = "none";
      if (windowSize < 525) {
        nonRollableInnerLeft.style.display = "none";
      }
    } else {
      setIsSpendingBountyPoints(false);
      setSpendButtonText("Spend");
      chipCountersContainer.style.display = "flex";
      if (windowSize < 525) {
        nonRollableInnerLeft.style.display = "flex";
      }
    }
  };

  const updateStat = async (_id, key, value) => {
    // Call the Netlify function
    const response = await fetch("/.netlify/functions/update_character", {
      method: "POST",
      body: JSON.stringify({ _id, key, value }),
    });
    const data = await response.json();
  };

  const handleIncrementClick = async (stat) => {
    let newWind = currentWind;
    let newBountyPoints = bountyPoints;
    if (stat === "bountyPoints") {
      newBountyPoints++;
      setBountyPoints(newBountyPoints);
      setRemainingBountyPoints((previousValue) => previousValue + 1);
      await updateStat(character._id, "bountyPoints", newBountyPoints);
    } else if (stat === "wind") {
      if (returnTotalWind() > currentWind) {
        newWind++;
        setCurrentWind(newWind);
      }
    }
  };

  const handleDecrementClick = async (stat) => {
    let newWind = currentWind;
    let newBountyPoints = bountyPoints;
    if (stat === "bountyPoints") {
      if (bountyPoints > 0) {
        newBountyPoints--;
        setBountyPoints(newBountyPoints);
        setRemainingBountyPoints((previousValue) => previousValue - 1);
        await updateStat(character._id, "bountyPoints", newBountyPoints);
      }
    } else if (stat === "wind") {
      if (currentWind > 0) {
        newWind--;
        setCurrentWind(newWind);
      }
    } else {
    }
  };

  const renderStat = (stat, statType, trait, className) => {
    switch (stat.name) {
      case "Language":
      case "Area Knowledge":
        return (
          <div key={stat.name} className={`stat-group__item ${className}`}>
            {stat.name}
          </div>
        );
        break;
      case "Home County":
        return (
          <div
            key={stat.name}
            className={`stat-group__item ${
              isSpendingBountyPoints ? "" : "stat-group__item_is-hoverable"
            } ${className}`}
            onClick={() => handleStatClick(stat, trait)}
          >
            <div className="stat-group__item-name">{stat.location}</div>
            <div className="stat-group__item-die-info">
              <span className="stat-accent-color">{stat.dieCount}</span>d
              <span className="stat-accent-color">{trait.dieSides}</span>
            </div>
            {isSpendingBountyPoints && (
              <StatUpgradeButton
                stat={stat}
                statType={statType}
                trait={trait}
                upgradesArray={upgradesArray}
                setUpgradesArray={setUpgradesArray}
                character={character}
                remainingBountyPoints={remainingBountyPoints}
                setRemainingBountyPoints={setRemainingBountyPoints}
              />
            )}
          </div>
        );
      default:
        return (
          <div
            key={stat.name}
            className={`stat-group__item ${
              isSpendingBountyPoints ? "" : "stat-group__item_is-hoverable"
            } ${className}`}
            onClick={() => handleStatClick(stat, trait)}
          >
            <div className="stat-group__item-name">{stat.name}</div>
            <div className="stat-group__item-die-info">
              <span className="stat-accent-color">{stat.dieCount}</span>d
              <span className="stat-accent-color">{trait.dieSides}</span>
            </div>
            {isSpendingBountyPoints && (
              <StatUpgradeButton
                stat={stat}
                statType={statType}
                trait={trait}
                upgradesArray={upgradesArray}
                setUpgradesArray={setUpgradesArray}
                character={character}
                remainingBountyPoints={remainingBountyPoints}
                setRemainingBountyPoints={setRemainingBountyPoints}
              />
            )}
          </div>
        );
    }
  };

  const renderConcentrations = (attribute) => {};

  const renderStatGroup = (traitName) => {
    const traitIndex = character.stats.traits.findIndex(
      (object) => object.name === traitName
    );
    const trait = character.stats.traits[traitIndex];
    return (
      <div
        className={
          traitName === "Knowledge"
            ? "stat-group stat-group_knowledge"
            : "stat-group"
        }
      >
        {renderStat(trait, "trait", trait, "stat-group__item_stat")}
        <div className="stat-group__list">
          {Array.isArray(trait.attributes) &&
            trait.attributes.map((attribute) => (
              <div className="stat-group__item-container" key={generateKey()}>
                {renderStat(
                  attribute,
                  "attribute",
                  trait,
                  "stat-group__item_attribute"
                )}
                {Array.isArray(attribute.concentrations) && (
                  <div className="stat-group__list">
                    {attribute.concentrations.map((concentration) =>
                      renderStat(
                        concentration,
                        "concentration",
                        trait,
                        "stat-group__item_concentration"
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderCharacterSheet = () => {
    return (
      <div className="rollable-stats">
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
    );
  };

  const [characterSheet, setCharacterSheet] = useState(renderCharacterSheet());

  return (
    <div className="panel character-sheet">
      <div className="non-rollable-stats">
        <div className="non-rollable-stats__inner-left">
          <div>
            Grit:{" "}
            <span className="stat-accent-color">{character.stats.grit}</span>
          </div>
          <div>
            Pace:{" "}
            <span className="stat-accent-color">{character.stats.pace}</span>
          </div>
          <div>
            Size:{" "}
            <span className="stat-accent-color">{character.stats.size}</span>
          </div>
          <div className="non-rollable-stats__wind-container">
            <div>
              Wind:
              <span className="stat-accent-color"> {currentWind}</span> /
              <span className="stat-accent-color">{returnTotalWind()}</span>
            </div>
            <div className="button__button-increment-container">
              <button
                className="button button__button-increment"
                onClick={() => handleIncrementClick("wind")}
              >
                +
              </button>
              <button
                className="button button__button-increment"
                onClick={() => handleDecrementClick("wind")}
              >
                -
              </button>
            </div>
          </div>
        </div>
        <div className="non-rollable-stats__bounty-points">
          Bounty Points:{" "}
          <span className="stat-accent-color">{bountyPoints}</span>
          <div className="button__button-increment-container">
            <button
              className="button button__button-increment"
              onClick={() => handleIncrementClick("bountyPoints")}
            >
              +
            </button>
            <button
              className="button button__button-increment"
              onClick={() => handleDecrementClick("bountyPoints")}
            >
              -
            </button>
          </div>
          <button
            id="spendButton"
            className="button button_large button__button-secondary"
            onClick={handleClickSpend}
          >
            {spendButtonText}
          </button>
        </div>
      </div>
      {renderCharacterSheet()}
    </div>
  );
};

export default CharacterSheet;
