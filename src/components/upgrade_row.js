import React, {useState} from "react";
import './upgrade_row.css'

const UpgrageRow = ({element, upgradesArray, setUpgradesArray}) => {

    const returnUpgradeDetails = () => {
        if (element.upgradeType === "dieSides") {
            return <div>Die type: d{element.stat.dieSides} → d{element.cost / 3} </div>
        } else {
            return <div>Die count: {element.stat.dieCount} → {element.stat.dieCount + 1}</div>
        }
    }
    const handleDeleteClick = () => {
        const newArray = []
        for (let i = 0; i < upgradesArray.length; i++) {
            if (upgradesArray[i] !== element) { newArray.push(upgradesArray[i]) }
        }
        setUpgradesArray(newArray)
    }

    return (
        <div className="upgrade-row">
            <div className="upgrade-row__content">
                {element.stat.name}
                <button onClick={() => {handleDeleteClick(element)}}>remove</button>
            </div>
            <div className="upgrade-row__content">
                {returnUpgradeDetails()}
                {element.cost}BP
            </div>
        </div>
    )
}

export default UpgrageRow