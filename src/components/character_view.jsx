// import { forEach } from "cypress/types/lodash";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RollPanel from "./roll_panel";
import ChipCounterContainer from "./chip_counters_container";
import StatUpgradeButton from "./stat_upgrade_button";
import SpendBountyPointsPanel from "./spend_bounty_points_panel";
import CharacterSheet from "./character_sheet";
import { CharacterContext } from "../contexts/characterContext";

import "./character_view.css";
import "../App.css";

const CharacterView = ({ character, characterIndex }) => {
  const [currentCharacter, setCurrentCharacter] = useState(character);
  const [isSpendingBountyPoints, setIsSpendingBountyPoints] = useState(false);

  const [statUpgradeButton, setStatUpgradeButton] = useState(null);
  const [upgradesArray, setUpgradesArray] = useState([]);
  const [hasEnoughBountyPoints, setHasEnoughBountyPoints] = useState(true);
  const [remainingBountyPoints, setRemainingBountyPoints] = useState(
    character.bountyPoints
  );
  const [bountyPoints, setBountyPoints] = useState(
    currentCharacter.bountyPoints
  );

  const [statNameToRoll, setStatNameToRoll] = useState("");
  const [dieCountToRoll, setDieCountToRoll] = useState("");
  const [dieSidesToRoll, setDieSidesToRoll] = useState("");

  return (
    <CharacterContext.Provider value={character}>
      <div className="view">
        <header className="header">
          <div className="character-indicator">
            <div className="character-indicator__image-container">
              <img
                className="character-indicator__image"
                src={currentCharacter.imageSrc}
              />
            </div>
            <div className="character-indicator__name-container">
              <span className="character-indicator__name">
                {currentCharacter.name}
              </span>
              <Link className="character-indicator__change-character" to="/">
                Change Character
              </Link>
            </div>
          </div>
        </header>

        <div className="horizontal-block">
          {/* {characterSheet} */}
          <CharacterSheet
            isSpendingBountyPoints={isSpendingBountyPoints}
            bountyPoints={bountyPoints}
            setStatNameToRoll={setStatNameToRoll}
            setDieCountToRoll={setDieCountToRoll}
            setDieSidesToRoll={setDieSidesToRoll}
            setIsSpendingBountyPoints={setIsSpendingBountyPoints}
            upgradesArray={upgradesArray}
            setUpgradesArray={setUpgradesArray}
            remainingBountyPoints={remainingBountyPoints}
            setRemainingBountyPoints={setRemainingBountyPoints}
            characterIndex={characterIndex}
            setBountyPoints={setBountyPoints}
          />
          <div>
            {isSpendingBountyPoints ? (
              <SpendBountyPointsPanel
                upgradesArray={upgradesArray}
                setUpgradesArray={setUpgradesArray}
                // character={currentCharacter}
                hasEnoughBountyPoints={hasEnoughBountyPoints}
                setHasEnoughBountyPoints={setHasEnoughBountyPoints}
                bountyPoints={bountyPoints}
                setBountyPoints={setBountyPoints}
                remainingBountyPoints={remainingBountyPoints}
                setRemainingBountyPoints={setRemainingBountyPoints}
              />
            ) : (
              <RollPanel
                statNameToRoll={statNameToRoll}
                setStatNameToRoll={setStatNameToRoll}
                dieCountToRoll={dieCountToRoll}
                dieSidesToRoll={dieSidesToRoll}
              />
            )}
            <div className="non-rollable-stats__inner-left">
              <ChipCounterContainer character={character} />
            </div>
          </div>
        </div>
        <div id="insufficientBountPointsPopover" popover="auto">
          Not enough bounty points
        </div>
      </div>
    </CharacterContext.Provider>
  );
};

export default CharacterView;
