import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { container } from './layout.module.css'
import Header from './header'
    

const Layout = ({ pageTitle, children }) => {

    const data = useStaticQuery(graphql`
        query MyQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `)

    return (
        <div>
        <div id="panelLayout">
            <div id="leftPanel">
                <div id="characterSelector">
                    <Link to="/">Change character</Link>
                </div>
                <Header></Header>
                {children}
                {/* This is the ID that would be the target for rendering the player character sheet.
                Replacing this with a {children} property.
                <div id="characterSheet" class="darkPanel"></div> 
                */}
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

export default Layout