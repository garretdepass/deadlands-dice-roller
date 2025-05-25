import React, {useState} from "react";
import './menu.css';
import { use } from "react";

const Menu = ({menuRef, dieCountUpgradeCost, dieSidesUpgradeCost, stat, upgradesArray, setUpgradesArray, statType, character, jsonStatIndex}) => {



    const handleMenuUpgradeClick = (upgradeType) => {
        let upgradeCost
        if (upgradeType === "dieCount") {
            upgradeCost = dieCountUpgradeCost
        } else {
            upgradeCost = dieSidesUpgradeCost
        }
        
        const newUpgrade = {
            cost: upgradeCost,
            stat: stat,
            jsonStatIndex: jsonStatIndex,
            upgradeType: upgradeType
        }
        setUpgradesArray([...upgradesArray, newUpgrade])
    }

    return (
        <div className="menu" ref={menuRef}>
            <div className="menu__menu-item" onClick={() => {handleMenuUpgradeClick("dieCount")}}>
                <div className="menu__menu-item-label">Add an additional die</div>
                <div className="menu__menu-item-cost">{dieCountUpgradeCost}</div>
            </div>
            <div className="menu__menu-item" onClick={() => {handleMenuUpgradeClick("dieSides")}}>
                <div className="menu__menu-item-label" >Upgrade die type</div>
                <div className="menu__menu-item-cost">{dieSidesUpgradeCost}</div>
            </div>
        </div>
)
};

export default Menu;