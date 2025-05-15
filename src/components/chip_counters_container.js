import {React, useState} from "react";
import './chip_counters_container.css';

const ChipCounterContainer = () => {


const [redChipCount, setRedChipCount] = useState(1);
const [blueChipCount, setBlueChipCount] = useState(2);
const [whiteChipCount, setWhiteChipCount] = useState(3);
const [legendChipCount, setLegendChipCount] = useState(4);

const renderChip = (chipCount, color) => {
    return (
        <div className="chip-counter">
            <div className="chip-counter__chip">
                <svg className={`chip-counter__chip-shape chip-counter__chip-shape_${color}`}>
                    <circle cx={"24"} cy={"24"} r={"24"}/>
                </svg>
                <div className={`chip-counter__chip-number chip-counter__chip-number_${color}`}>{chipCount}</div>
            </div>
            <div className="chip-counter__button-container">
                <button className="chip-counter__button">+</button>
                <button className="chip-counter__button">-</button>
            </div>
        </div>
    )
}

    return (
        <div className="chip-counters-container">
            {renderChip(whiteChipCount, "white")}
            {renderChip(redChipCount, "red")}
            {renderChip(blueChipCount, "blue")}
            {renderChip(legendChipCount, "legend")}
        </div>
    )
}

export default ChipCounterContainer