import { React, useState, useContext } from "react";
import { CharacterContext } from "../contexts/characterContext";
import "./chip_button.css";
import Menu from "./menu";

const ChipButton = ({ color }) => {
  const character = useContext(CharacterContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [chipCount, setChipCount] = useState(character.fateChips[color]);

  const handleChipButtonClick = () => {
    isMenuVisible ? setIsMenuVisible(false) : setIsMenuVisible(true);
  };

  const updateCharacterChips = async (_id, key, value) => {
    // Call the Netlify function
    const response = await fetch("/.netlify/functions/update_character", {
      method: "POST",
      body: JSON.stringify({ _id, key, value }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleIncrementClick = async () => {
    const newChipCount = chipCount + 1;
    await updateCharacterChips(
      character._id,
      `fateChips.${color}`,
      newChipCount
    );
    setChipCount(newChipCount);
  };

  const handleDecrementClick = async () => {
    const newChipCount = chipCount - 1;
    await updateCharacterChips(
      character._id,
      `fateChips.${color}`,
      newChipCount
    );
    setChipCount(newChipCount);
  };

  return (
    <div>
      <button
        className={`button__chip-button button__chip-button_${color}`}
        onClick={handleChipButtonClick}
      >
        {chipCount}
      </button>
      {isMenuVisible && (
        <Menu setIsMenuVisible={setIsMenuVisible}>
          <div className="menu__menu-item" onClick={handleIncrementClick}>
            Add one
          </div>
          <div className="menu__menu-item" onClick={handleDecrementClick}>
            Remove one
          </div>
        </Menu>
      )}
    </div>
  );
};

export default ChipButton;
