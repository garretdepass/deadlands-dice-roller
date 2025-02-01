import React, { useState } from "react";
import RollRow from "./rollControlComponents/rollRow";
import {
    rollingSection
} from "./rollingSection.module.css"

function RollingSection ({sides, dieCount}) {
    let rowCount = 1;
    const initialRow = Array.from({length: rowCount}, (_, i) => ({
        sides: sides,
        dieCount: dieCount,
        isExploding: false
    }))
    const [rows, setRows] = useState(initialRow)

    function handleRoll () {
        setRows(initialRow) // when dice are rolled, the roll row array is returned to initial state
    };
    





    // Explosions are tricky. I think there are currently some recursive loops happening
    // somewhere as things are passed between rollRow and rollingSection on explosion.
    // making rollRow automatically roll on explosion exacerbates this, and causes an
    // infinite loop crash. Investigate the underlying looping issue. maybe look at 
    // triggering dice rolling on render? could it be a method of the object (e.g. "object.rolldice")?


    const handleExplode = (explosionCount) => {
        let newRowArray = initialRow;
        newRowArray.push(
            {
                sides: sides,
                dieCount: explosionCount,
                isExploding: true
            }
        )
        setRows([...newRowArray])
        let count = 1
        newRowArray.map(row => {
            console.log("row " + count + " isExploding = " + row.isExploding)
            count ++
        })
        console.log(rows.length)
    }

    return (
        <div className={rollingSection}>
            {rows.map((row) => {
                return (
                    <RollRow  
                        sides={row.sides} 
                        dieCount={row.dieCount}
                        onExplode={handleExplode}
                        isExploding={row.isExploding}
                        onRoll={handleRoll}
                    />        
                )
            })}
            <button>Roll</button>
        </div>
    );
};

export default RollingSection