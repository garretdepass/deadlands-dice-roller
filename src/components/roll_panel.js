import React, { useState, useEffect } from "react";
import Die from "./die.js";
import "./roll_panel.css"


const RollPanel = ({ statNameToRoll, dieCountToRoll, dieSidesToRoll }) => {

    let isUntrained = false;
    const [diceSection, setDiceSection] = useState(null);
    const generateKey = () => `${Date.now()}-${Math.random()}`;

    const returnDice = (dieCountToRoll, dieSidesToRoll) => {
        const dice = [];
        let dieCount = dieCountToRoll;

        if (dieCount === 0) {
            dieCount = 1
            isUntrained = true
            // setIsUntrained(true)
        } else {
            isUntrained = false
            // setIsUntrained(false)
        }
        console.log(dieCount)
        for (let i = 0; i < dieCount; i++ ) {
            dice.push(<Die key={generateKey()} dieSides={dieSidesToRoll} dieFace={dieSidesToRoll}/>);
        };
        return dice;
    };
    
    
    useEffect(() => {
        if (statNameToRoll && dieSidesToRoll) {
            setDiceSection(returnDice(dieCountToRoll, dieSidesToRoll));
        } else {
            setDiceSection(null);
        }
    }, [statNameToRoll]);
    
    
    const rollDice = (dieCountToRoll, dieSidesToRoll) => {
        let dieCount = dieCountToRoll
        const newRollList = [];
        const rollTotals = []
        const rollSingleDie = (totalSides) => {return(Math.ceil(Math.random() * totalSides))}
        
        for (let currentDieRow = 0; currentDieRow < dieCount; currentDieRow++ ) {
            const newRollRow = [];
            let rollRowTotal = 0;
            const rollResult = rollSingleDie(dieSidesToRoll)
            rollRowTotal += rollResult
            newRollRow.push(<Die dieSides={dieSidesToRoll} dieFace={rollResult} />);
            
            if (rollResult === dieSidesToRoll) {
                let isExploding = true
                while (isExploding === true) {
                    const aceRollResult = rollSingleDie(dieSidesToRoll)
                    rollRowTotal += aceRollResult
                    newRollRow.push(<Die dieSides={dieSidesToRoll} dieFace={aceRollResult} />);
                    if (aceRollResult !== dieSidesToRoll) {isExploding = false}
                }
            }
            rollTotals.push(rollRowTotal);
            newRollList.push(
                <div key={generateKey()} id={`rollRow${currentDieRow}`}>
                    <div>
                        text stating this is the highest value
                    </div>
                    <div>
                        {newRollRow}
                    </div>
                </div>);
        };
        console.log(`rollTotals array is ${rollTotals}`)

        //find the index of the highest value
        let highestRollTotal = 0
        let highestRollIndex = 0
        rollTotals.forEach((value, index) => {
            if (value > highestRollTotal) {
                highestRollTotal = value;
                highestRollIndex = index
            }
        })

        return newRollList;
    }
    
    const handleRollDice = (dieCountToRoll, dieSidesToRoll) => {
        setDiceSection(rollDice(dieCountToRoll, dieSidesToRoll))
    }

    return (
        <div>
            <div>{statNameToRoll? `Rolling ${statNameToRoll}` : "Select a trait to roll."}</div>
            <div className="dice-section">{diceSection}</div>
            <button 
            onClick={() => {handleRollDice(dieCountToRoll, dieSidesToRoll)}}
            >Roll Dice</button>
        </div>
    )
};

export default RollPanel;