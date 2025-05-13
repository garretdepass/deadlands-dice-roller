import React, { useState, useEffect } from "react";
import Die from "./die.js";
import "./roll_panel.css"


const RollPanel = ({ statNameToRoll, dieCountToRoll, dieSidesToRoll }) => {
    
    const [diceSection, setDiceSection] = useState(null);
    const [isUnskilled, setIsUnskilled] = useState(false);
    const [isBust, setIsBust] = useState(false);

    const generateKey = () => `${Date.now()}-${Math.random()}`;
    
    const generateDiceArray = (dieCountToRoll, dieSidesToRoll) => {
        const dice = [];
        let dieCount = dieCountToRoll;

        if (dieCount === 0) {
            dieCount = 1
            setIsUnskilled(true)
        } else {
            setIsUnskilled(false)
        }
        for (let i = 0; i < dieCount; i++ ) {
            dice.push(dieSidesToRoll);
        };
        return dice;
    }; 
    
    const returnRolledDieValue = (totalSides) => {return(Math.ceil(Math.random() * totalSides))}
    
    const returnRolledDiceArray = (dieCountToRoll, dieSidesToRoll) => {
        let threadCount = 0;
        isUnskilled === true ? threadCount = 1 : threadCount = dieCountToRoll;
        const allRolledThreads = [];
        
        for (let currentThread = 0; currentThread < threadCount; currentThread++ ) {
            const newThread = [];
            const rollResult = returnRolledDieValue(dieSidesToRoll)
            newThread.push(rollResult)
            
            if (rollResult === dieSidesToRoll) {
                let isExploding = true
                while (isExploding === true) {
                    const aceRollResult = returnRolledDieValue(dieSidesToRoll)
                    newThread.push(aceRollResult)
                    if (aceRollResult !== dieSidesToRoll) {isExploding = false}
                }
            }
            allRolledThreads.push(newThread);
        };
        return allRolledThreads;
    }
    
    const findHighestThread = (array) => {
        const allThreadTotals = [];
        
        array.forEach(thread => {
            let threadTotal = 0;
            thread.forEach((value, index) => {
                threadTotal += value;
            })
            allThreadTotals.push(threadTotal)
        })
        
        const highestThread = {};
        highestThread.total = 0;
        
        allThreadTotals.forEach((value, index) => {
            if (value > highestThread.total) {
                highestThread.total = value;
                highestThread.index = index
            }
        })
        return highestThread   
    }

    const checkForBust = (array) => {
        let totalDice = 0;
        let numberOfOnes = 0;
        array.forEach(thread => {
            thread.forEach(die => {
                totalDice ++;;
                if (thread[0] === 1) {numberOfOnes ++};
            })
        });
        if (numberOfOnes > Math.floor(totalDice / 2)) {
            setIsBust(true);
        } else {
            setIsBust(false);
        };
    }

    const returnDie = (thread) => {
        const die = Array.isArray(thread) ? thread.map((value, valueIndex) => (
            <Die key={generateKey()} dieSides={dieSidesToRoll} dieFace={value}/>
        )) : <div>{thread}</div>
        return die;
    }

    const renderDiceThreads = (array, newHighestThread) => {
        let adjustedTotal = newHighestThread.total
        if (isUnskilled) {adjustedTotal -= 4}
        if (adjustedTotal < 0) {adjustedTotal = 0}
        const jsx = Array.isArray(array) ? array.map((thread, threadIndex) => (
            <div key={`thread-${threadIndex}`}>
                <div>{(threadIndex === newHighestThread.index) ? `Highest roll: ${adjustedTotal}` : ''}</div>
                {returnDie(thread)}    
            </div>)) : <div>missing array</div>
        return jsx
    }

    useEffect(() => {
        const newHighestThread = {index: null, total: null}
        if (statNameToRoll && dieSidesToRoll) {
            setDiceSection(renderDiceThreads(generateDiceArray(dieCountToRoll, dieSidesToRoll), newHighestThread));
        } else {
            setDiceSection(null);
        }
    }, [statNameToRoll]);

    const handleRollDice = (dieCountToRoll, dieSidesToRoll) => {
        const threads = returnRolledDiceArray(dieCountToRoll, dieSidesToRoll)
        const newHighestThread = findHighestThread(threads)
        checkForBust(threads)
        setDiceSection(renderDiceThreads(threads, newHighestThread))
    }

    return (
        <div className="panel roll-panel">
            <div>{statNameToRoll? `Rolling ${statNameToRoll}` : "Select a trait to roll."}</div>
            <div>{isUnskilled === true ? `Untrained. -4 modifier applied to roll total` : ``}</div>
            <div className="dice-section">{diceSection}</div>
            <div>{isBust === true ? `Too many 1's. You've gone bust!` : ``}</div>
            <button 
            onClick={() => {handleRollDice(dieCountToRoll, dieSidesToRoll)}}
            >Roll Dice</button>
        </div>
    )
};

export default RollPanel;