import { React, useState } from "react";
import "./chip_counters_container.css";
import ChipButton from "./chip_button";

const ChipCounterContainer = ({ character }) => {
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
      <ChipButton color={"white"} />
      <ChipButton color={"red"} />
      <ChipButton color={"blue"} />
      <ChipButton color={"legendary"} />
    </div>
  );
};

export default ChipCounterContainer;
