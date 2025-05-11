import React, { useState, useEffect } from "react";
import Die from "./die.js";
import "./roll_panel.css"


const RollPanel = ({ statNameToRoll, dieCountToRoll, dieSidesToRoll }) => {

    const [isUntrained, setIsUntrained] = useState (false)

    const [diceSection, setDiceSection] = useState(null)

    const returnDice = (dieCountToRoll, dieSidesToRoll) => {
        const dice = [];
        for (let i = 0; i < dieCountToRoll; i++ ) {
            dice.push(<Die dieSides={dieSidesToRoll} dieFace={dieSidesToRoll}/>);
            setIsUntrained(false);
        };
        if (dieCountToRoll === 0) {
            dice.push(<Die dieSides={dieSidesToRoll} dieFace={dieSidesToRoll}/>);
            setIsUntrained(true);
        }
        return dice;
    }
    
    
    useEffect(() => {
        if (statNameToRoll && dieSidesToRoll) {
            setDiceSection(returnDice(dieCountToRoll, dieSidesToRoll))
        } else {
            setDiceSection(null);
        }
    }, [statNameToRoll])
    
    
    const rollDice = (dieCountToRoll, dieSidesToRoll) => {
        console.log(`die count is ${dieCountToRoll} and die sides are ${dieSidesToRoll}`)
        const newRoll = [];
        const currentRollCount = dieCountToRoll
        // need to handle explosions on untrained rolls
        // should probably turn this into switch / case — I'll need to use this for going bust too
        for (let i = 0; i < currentRollCount; i++ ) {
            // should turn this into a function and pull it out of the loop, then call it on dieFace
            const rollResult = Math.ceil(Math.random() * dieSidesToRoll)
            newRoll.push(<Die dieSides={dieSidesToRoll} dieFace={rollResult} />);
            if (rollResult === dieSidesToRoll) {i = i - 1}
        };
        if (currentRollCount === 0) {
            const rollResult = Math.ceil(Math.random() * dieSidesToRoll)
            newRoll.push(<Die dieSides={dieSidesToRoll} dieFace={rollResult} />);
        }
        return newRoll;
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