import React, { useState } from "react";
import Die from "./die";
import {
    rollRowContainer,
    diceRow
} from "./rollRow.module.css"

function RollRow ({sides, dieCount, onExplode, isExploding, onRoll}) {
    const [dieRollResult, setDieRowResult] = useState(0);
    const [highestRoll, setHighestRoll] = useState(0);

    const [dice, setDice] = useState(
        Array.from({ length: dieCount }, (_, i) => ({
            rollResult: 0, // Default roll result is 0
            keyProp: i,     // Unique key for each die
        }))
    );
    

    function rollDice () {
        onRoll()
        let newHighestRoll = 0;
        let explosionCount = 0;
        const newDice = dice.map((die) => {
            const rollResult = Math.ceil(Math.random() * sides);
            if (rollResult === sides) {
                explosionCount ++
                console.log("explosionCount is " + explosionCount)
            }
            newHighestRoll = Math.max(newHighestRoll, rollResult);
            if (explosionCount > 0) {
                onExplode(explosionCount);
            }
            return {...die, rollResult}
        });
        setDice(newDice);
        setHighestRoll(newHighestRoll)
    };

    
    return (
        <div className={rollRowContainer}>
            <div class="roll result area">{highestRoll}</div>
            <div className={diceRow}>
                {dice.map((die) => {
                    return <Die sides={sides} rollResult={die.rollResult}/>
                })}
            </div>
            <button onClick={rollDice}>temp roll button</button>
        </div>
    );
};

export default RollRow;