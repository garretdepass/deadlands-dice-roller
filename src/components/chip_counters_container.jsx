import { React, useState } from "react";
import "./chip_counters_container.css";

const ChipCounterContainer = ({ character }) => {
  const [redChipCount, setRedChipCount] = useState(character.fateChips.red);
  const [blueChipCount, setBlueChipCount] = useState(character.fateChips.blue);
  const [whiteChipCount, setWhiteChipCount] = useState(
    character.fateChips.white
  );
  const [legendChipCount, setLegendChipCount] = useState(
    character.fateChips.legendary
  );

  const updateCharacterChips = async (_id, key, value) => {
    // Call the Netlify function
    const response = await fetch("/.netlify/functions/update_character", {
      method: "POST",
      body: JSON.stringify({ _id, key, value }),
    });
    const data = await response.json();
  };

  const handleChipIncrementClick = async (color) => {
    let newWhiteChipCount = whiteChipCount;
    let newRedChipCount = redChipCount;
    let newBlueChipCount = blueChipCount;
    let newLegendChipCount = legendChipCount;
    switch (color) {
      case "red":
        newRedChipCount++;
        setRedChipCount(newRedChipCount);
        await updateCharacterChips(
          character._id,
          "fateChips.red",
          newRedChipCount
        );
        break;
      case "blue":
        newBlueChipCount++;
        setBlueChipCount(newBlueChipCount);
        await updateCharacterChips(
          character._id,
          "fateChips.blue",
          newBlueChipCount
        );
        break;
      case "white":
        newWhiteChipCount++;
        setWhiteChipCount(newWhiteChipCount);
        await updateCharacterChips(
          character._id,
          "fateChips.white",
          newWhiteChipCount
        );
        break;
      case "legend":
        newLegendChipCount++;
        setLegendChipCount(newLegendChipCount);
        await updateCharacterChips(
          character._id,
          "fateChips.legendary",
          newLegendChipCount
        );
        break;
      default:
        console.log(`not passing color correctly`);
    }
  };

  const handleChipDecrementClick = async (color) => {
    let newWhiteChipCount = whiteChipCount;
    let newRedChipCount = redChipCount;
    let newBlueChipCount = blueChipCount;
    let newLegendChipCount = legendChipCount;
    switch (color) {
      case "red":
        if (redChipCount) {
          newRedChipCount--;
          setRedChipCount(newRedChipCount);
          await updateCharacterChips(
            character._id,
            "fateChips.red",
            newRedChipCount
          );
        }
        break;
      case "blue":
        if (blueChipCount) {
          newBlueChipCount--;
          setBlueChipCount(newBlueChipCount);
          await updateCharacterChips(
            character._id,
            "fateChips.blue",
            newBlueChipCount
          );
        }
        break;
      case "white":
        if (whiteChipCount) {
          newWhiteChipCount--;
          setWhiteChipCount(newWhiteChipCount);
          await updateCharacterChips(
            character._id,
            "fateChips.white",
            newWhiteChipCount
          );
        }
        break;
      case "legend":
        if (legendChipCount) {
          newLegendChipCount--;
          setLegendChipCount(newLegendChipCount);
          await updateCharacterChips(
            character._id,
            "fateChips.legendary",
            newLegendChipCount
          );
        }
        break;
      default:
        console.log(`not passing color correctly`);
    }
  };

  const renderChip = (chipCount, color) => {
    return (
      <div className="chip-counter">
        <div className="chip-counter__chip">
          <svg
            className={`chip-counter__chip-shape chip-counter__chip-shape_${color}`}
          >
            <circle cx={"24"} cy={"24"} r={"24"} />
          </svg>
          <div
            className={`chip-counter__chip-number chip-counter__chip-number_${color}`}
          >
            {chipCount}
          </div>
        </div>
        <div className="chip-counter__button-container">
          <button
            className="chip-counter__button"
            onClick={() => handleChipIncrementClick(color)}
          >
            +
          </button>
          <button
            className="chip-counter__button"
            onClick={() => handleChipDecrementClick(color)}
          >
            -
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="chip-counters-container">
      {renderChip(whiteChipCount, "white")}
      {renderChip(redChipCount, "red")}
      {renderChip(blueChipCount, "blue")}
      {renderChip(legendChipCount, "legend")}
    </div>
  );
};

export default ChipCounterContainer;
