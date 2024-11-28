// Step 1: Import React
import * as React from 'react'

// Step 2: Define your component
const diceRoller = () => {
  return (
    <div>
        <div id="panelLayout">
            <div id="leftPanel">
                <div id="characterSelector"></div>
                <div id="characterSheet" class="darkPanel"></div>
            </div>
            <div id="mainView">
                <div id="dieControls" class="darkPanel"></div>
                <div id="rollPanel">
                    <div id="rollRowContainer"></div>
                    <div id="rollResultContainer">
                        <div hidden id="bustContainer">
                            <div>Ya' just went bust, bucko!</div>
                        </div>
                        <div class="h1" hidden id="rollResult">Roll result: <span class="inter-bold" id="rollResultInteger"></span></div>
                        <div hidden id="penaltyText" class="body2, inter-bold">Current penalty, <span id="penaltyCount">0</span></div>
                        <div id="helperText" class="body nullState">Select a trait or attribute to roll</div>
                        <button class="button-primary" id="rollButton" disabled onclick="clickRoll(naturalTraitDieCount, naturalTraitDieSides)">Roll</button>
                    </div>
                </div>
                <div id="bottomRow">
                    <div id="chipPanel" class="lightPanel bottomRowPanel">
                        <div class="h2">Chip Count</div>
                        <div id="chipCounterContainer">
                            <div class="chipCounter">
                                <div class="chipButton" id="blueChip" onclick="spendChip(1)"></div>
                                <div class="chipControls">
                                    <button class="plusButton" onclick="addChipCount(1)">+</button>
                                    <button class="minusButton" onclick="subtractChipCount(1)">-</button>
                                </div>
                            </div>
                            <div class="chipCounter">
                                <div class="chipButton" id="redChip" onclick="spendChip(2)"></div>
                                <div class="chipControls">
                                    <button class="plusButton" onclick="addChipCount(2)">+</button>
                                    <button class="minusButton" onclick="subtractChipCount(2)">-</button>
                                </div>
                            </div>
                            <div class="chipCounter">
                                <div class="chipButton" id="whiteChip" onclick="spendChip(3)"></div>
                                <div class="chipControls">
                                    <button class="plusButton" onclick="addChipCount(3)">+</button>
                                    <button class="minusButton" onclick="subtractChipCount(3)">-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tipPanel" class="darkPanel bottomRowPanel">
                        <div id="tipTitle" class="h2"></div>
                        <div id="tipBody" class="body2"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export const Head = () =>

    <head>
        <title>Dice Roller</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"></link>
        <link rel="stylesheet" href="css/main.css"></link>
    </head>

// Step 3: Export your component
export default diceRoller