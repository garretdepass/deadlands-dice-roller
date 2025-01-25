import React, { Children } from "react";
import D4 from "./dice/d4";
import D6 from "./dice/d6";
import D8 from "./dice/d8";
import {
    dieContainer,
    rollResult,
    shapeContainer
} from './die.module.css'

function Die ({sides}) {
    
    let diceArray = [
        {
            dieSides: 4,
            returnedElement: <D4/>
        },
        {
            dieSides: 6,
            returnedElement: <D6/>
        },
        {
            dieSides: 8,
            returnedElement: <D8/>
        }
    ]

    let currentDie = diceArray[0].returnedElement;

    for (const die in diceArray) {
        if (diceArray[die].dieSides == sides) {
        currentDie = diceArray[die].returnedElement;
        }
    }  


    // need to adjust layout and sizing so that the 
    // roll result is always vertically centered in the 
    // die. Also need to add standard die container 
    // sizing. Looking good though!
    return (
        <div className={dieContainer}>
            <div className={shapeContainer}>
            {currentDie}
            </div>
            <div className={rollResult}>
                8
            </div>
        </div>
    )
};

export default Die