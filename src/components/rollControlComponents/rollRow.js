import React from "react";
import Die from "./die";
import {
    rollRowContainer,
    diceRow
} from "./rollRow.module.css"

function RollRow ({sides, dieCount}) {
    let dice = []
    for (let i = dieCount; i > 0; i --) {
        dice.push(<Die sides={sides}/>)
    }

    return (
        <div className={rollRowContainer}>
            <div class="roll result area">Highest result</div>
            <div className={diceRow}>
                {dice.map(die => {return die})}
            </div>
        </div>
    );
};

export default RollRow;