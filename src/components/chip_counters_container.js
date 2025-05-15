import {React, useState} from "react";
import './chip_counters_container.css';

const ChipCounterContainer = ({character}) => {


const [redChipCount, setRedChipCount] = useState(character.fateChips.red);
const [blueChipCount, setBlueChipCount] = useState(character.fateChips.blue);
const [whiteChipCount, setWhiteChipCount] = useState(character.fateChips.white);
const [legendChipCount, setLegendChipCount] = useState(character.fateChips.legendary);

const handleChipIncrementClick = (color) => {
    let newWhiteChipCount = whiteChipCount;
    let newRedChipCount = redChipCount;
    let newBlueChipCount = blueChipCount
    let newLegendChipCount = legendChipCount
    switch (color) {
        case "red":
            newRedChipCount ++;
            setRedChipCount(newRedChipCount);
            break;
        case "blue":
            newBlueChipCount ++;
            setBlueChipCount(newBlueChipCount);
            break;
        case "white":
            newWhiteChipCount ++;
            setWhiteChipCount(newWhiteChipCount);
            break;
        case "legend":
            newLegendChipCount ++;
            setLegendChipCount(newLegendChipCount);
            break;
        default:
            console.log(`not passing color correctly`)
    }
}

const handleChipDecrementClick = (color) => {
    let newWhiteChipCount = whiteChipCount;
    let newRedChipCount = redChipCount;
    let newBlueChipCount = blueChipCount
    let newLegendChipCount = legendChipCount
    switch (color) {
        case "red":
            newRedChipCount --;
            setRedChipCount(newRedChipCount);
            break;
        case "blue":
            newBlueChipCount --;
            setBlueChipCount(newBlueChipCount);
            break;
        case "white":
            newWhiteChipCount --;
            setWhiteChipCount(newWhiteChipCount);
            break;
        case "legend":
            newLegendChipCount --;
            setLegendChipCount(newLegendChipCount);
            break;
        default:
            console.log(`not passing color correctly`)
    }
}

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
                <button className="chip-counter__button" onClick={() => handleChipIncrementClick(color)}>+</button>
                <button className="chip-counter__button" onClick={() => handleChipDecrementClick(color)}>-</button>
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