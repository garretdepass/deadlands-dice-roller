import React, {useEffect, useState} from "react";
import './spend_bounty_points_panel.css'

const SpendBountyPointsPanel = ({upgradesArray, setUpgradesArray, character}) => {

    const [displayedUpgrades, setDisplayedUpgrades] = useState([])
    
    // calculate total points to spend
    const [totalBountyPointsToSpend, setTotalBountyPointsToSpend] = useState(0);

    const returnTotalCost = () => {
        const costsArray = upgradesArray.map((element) => {return element.cost});
        const totalCost = costsArray.reduce((accumulator, currentValue) => accumulator + currentValue)
        return totalCost
    }

    useEffect(() => {
        const renderUpgrades = upgradesArray.map(element => {
            return <div key={`${Date.now()}-${Math.random()}`}>{`Upgrading ${element.stat.name} ${element.upgradeType} for ${element.cost}.`}</div>
        })

        if (upgradesArray.length > 0) {
            setDisplayedUpgrades(renderUpgrades)
            setTotalBountyPointsToSpend(returnTotalCost)

        } else {
            setDisplayedUpgrades(<div>Select a stat to update</div>)
        }
        }, [upgradesArray])


    const handleBountyPointsPanelCancel = () => {
        setUpgradesArray([])
        setTotalBountyPointsToSpend(0)
    }


    const updateCharacterStats = async (_id, key, value) => {
        // Call the Netlify function
        const response = await fetch('/.netlify/functions/update_character', {
          method: 'POST',
          body: JSON.stringify({ _id, key, value })
        });
        const data = await response.json();
    }

    


    const returnValueToUpdate = (currentUpgrade) =>{
        const dieTypeArray = [4, 6, 8, 10, 12, 20, 100]
        if (currentUpgrade.upgradeType === "dieSides") {
            const currentDieTypeIndex = dieTypeArray.findIndex((element) => element === currentUpgrade.stat.dieSides)
            return dieTypeArray[currentDieTypeIndex + 1]
        } else if (currentUpgrade.upgradeType === "dieCount") {
            return currentUpgrade.stat.dieCount + 1
        }
    }

    const handleSpendPointsClick = async () => {

        for (let i = 0; i < upgradesArray.length; i++) {
            const currentUpgrade = upgradesArray[i]
            const statToUpdate = `${currentUpgrade.jsonStatIndex}.${currentUpgrade.upgradeType}`
            const valueToUpdate = returnValueToUpdate(currentUpgrade)
            await updateCharacterStats(character._id, statToUpdate, valueToUpdate)
            setUpgradesArray([])
            setTotalBountyPointsToSpend(0)
        }
        // 
        // 
        // update character sheet with:
        // deduct bounty points
    }

    return (
        <div className="panel panel__panel-right">
            <div>Spend Bounty Points</div>
            <div>Spending: {totalBountyPointsToSpend}</div>
            <div className="bounty-points-cart">
                {displayedUpgrades}
                {/* {upgradesArray ? displayedUpgrades : "Your cart is currently empty."} */}
            </div>
            <div className="panel-right__button-row">
                <button className="button button__button-secondary" onClick={handleBountyPointsPanelCancel}>Cancel</button>
                <button className="button button__button-primary"onClick={handleSpendPointsClick}>Spend Points</button>
            </div>
        </div>
    )
}

export default SpendBountyPointsPanel