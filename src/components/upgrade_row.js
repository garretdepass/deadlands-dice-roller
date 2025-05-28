import React, {useState} from "react";
import './upgrade_row.css'
import "../App.css"

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
            <div className="upgrade-row__details">
                <span className="upgrade-row__stat-name">{element.stat.name}</span>
                <div className="upgrade-row__upgrade-details">{returnUpgradeDetails()}</div>
            </div>
                <div className="upgrade-row__cost-and-cancel-container">
                    <span>
                        <span className="upgrade-row__cost">{element.cost}</span> BP
                    </span>
                    <button className="button button_square button__button-tertiary" onClick={() => {handleDeleteClick(element)}}>x</button>
                </div>
        </div>
    )
}

export default UpgrageRow