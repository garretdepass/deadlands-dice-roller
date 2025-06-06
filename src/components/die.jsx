import React, { useState } from "react";
import "./die.css";
import D4Shape from "./die_shapes/d4";
import D6Shape from "./die_shapes/d6";
import D8Shape from "./die_shapes/d8";
import D10Shape from "./die_shapes/d10";
import D12Shape from "./die_shapes/d12";
import D20Shape from "./die_shapes/d20";

const Die = ({ dieSides, dieFace, isInHighThread }) => {
  const returnDieShape = () => {
    switch (dieSides) {
      case 4:
        return <D4Shape />;
        break;
      case 6:
        return <D6Shape />;
        break;
      case 8:
        return <D8Shape />;
        break;
      case 10:
        return <D10Shape />;
        break;
      case 12:
        return <D12Shape />;
        break;
      case 20:
        return <D20Shape />;
        break;
      default:
        console.log("no recognized die type");
    }
  };
  return (
    <div className={`die-section__die ${dieSides}`}>
      <div
        className={`die-section__die-shape die-section__die-shape_d-${dieSides} ${
          isInHighThread && "die-section__dieshape_high-thread"
        }`}
      >
        {returnDieShape()}
      </div>
      <div
        className={`die-section__die-number die-section__die-number_d-${dieSides} die-section__dieshape_low-thread`}
      >
        {dieFace}
      </div>
    </div>
  );
};

export default Die;
