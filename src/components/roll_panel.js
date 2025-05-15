import React, { useState, useEffect } from "react";
import Die from "./die.js";
import "./roll_panel.css"


const RollPanel = ({ statNameToRoll, dieCountToRoll, dieSidesToRoll }) => {
    
    const [diceSection, setDiceSection] = useState(null);
    const [isUnskilled, setIsUnskilled] = useState(false);
    const [isBust, setIsBust] = useState(false);
    const [highestRollResult, setHighestRollResult] = useState(null)
    const [isRollButtonDisabled, setIsRollButtonDisabled] = useState(true)

    const generateKey = () => `${Date.now()}-${Math.random()}`;
    
    const generateDiceArray = (dieCountToRoll, dieSidesToRoll) => {
        setHighestRollResult(null)
        setIsBust(false)
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

    const returnDie = (thread, isInHighThread) => {
        const die = Array.isArray(thread) ? thread.map((value, valueIndex) => (
            <Die key={generateKey()} dieSides={dieSidesToRoll} dieFace={value} isInHighThread={isInHighThread} />
        )) : <Die key={generateKey()} dieSides={dieSidesToRoll} dieFace={thread} isInHighThread={isInHighThread}/>
        return die;
    }

    const renderDiceThreads = (array, newHighestThread) => {
        const jsx = Array.isArray(array) ? array.map((thread, threadIndex) => (
            newHighestThread.index === threadIndex ?

            <div key={`thread-${threadIndex}`} className="dice-section__die-thread">
                <div className="dice-section__die-thread-inner dice-section__die-thread-inner_highest">
                    {returnDie(thread, true)}
                    <div className="dice-section_highest-roll-text">Highest roll</div>    
                </div>
            </div>

            :
            <div key={`thread-${threadIndex}`} className="dice-section__die-thread">
                <div className="dice-section__die-thread-inner">
                {returnDie(thread, false)}    
                </div>
            </div>
            
        )) : <div>missing array</div>
        return jsx
    }

    useEffect(() => {
        const newHighestThread = {index: null, total: null}
        if (statNameToRoll && dieSidesToRoll) {
            setDiceSection(renderDiceThreads(generateDiceArray(dieCountToRoll, dieSidesToRoll), newHighestThread));
            setIsRollButtonDisabled(false);
        } else {
            setDiceSection(null);
            setIsRollButtonDisabled(true);
        }
    }, [statNameToRoll]);

    const handleRollDice = (dieCountToRoll, dieSidesToRoll) => {
        const threads = returnRolledDiceArray(dieCountToRoll, dieSidesToRoll)
        const newHighestThread = findHighestThread(threads)
        let adjustedTotal = newHighestThread.total
        if (isUnskilled) {adjustedTotal -= 4}
        if (adjustedTotal < 0) {adjustedTotal = 0}
        setHighestRollResult(adjustedTotal)
        checkForBust(threads)
        setDiceSection(renderDiceThreads(threads, newHighestThread))
    }

    // const handleClearDice = () => {
    //     setDiceSection(null);
    //     statNameToRoll = null;
    // }

    return (
        <div className="panel roll-panel">
            <div>{statNameToRoll? `Rolling ${statNameToRoll}` : "Select a trait to roll."}</div>
            <div className="dice-section">
                <div className="dice-section-inner">
                    {diceSection}
                </div>
            </div>
            <div className="result-section">
                <div className="result-section__bust-indicator">{isBust === true ? `More than half the dice are 1's. You've gone bust!` : ``}</div>
                <div className="result-section__roll-result">{highestRollResult !== null ? `Roll result: ${highestRollResult}` : ''}</div>
                <div>{isUnskilled === true ? `Untrained. -4 modifier applied to roll total` : ``}</div>
            </div>
            <div className="button-row">
                {/* <button className="button button__button-secondary" onClick={() => {handleClearDice()}}>
                    Clear
                </button> */}
                <button className="button button__button-primary"onClick={() => {handleRollDice(dieCountToRoll, dieSidesToRoll)}} disabled={isRollButtonDisabled}>
                    {isRollButtonDisabled ? "Select a stat to roll" : "Roll Dice"}
                </button>
            </div>
        </div>
    )
};

export default RollPanel;