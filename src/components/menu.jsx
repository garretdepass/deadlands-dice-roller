import React, { useState } from "react";
import "./menu.css";
import { use } from "react";

const Menu = ({
  menuRef,
  dieCountUpgradeCost,
  dieSidesUpgradeCost,
  stat,
  upgradesArray,
  setUpgradesArray,
  statType,
  character,
  jsonStatIndex,
  remainingBountyPoints,
  setRemainingBountyPoints,
}) => {
  const cost = (upgradeType) => {
    if (upgradeType === "dieCount") {
      return dieCountUpgradeCost;
    } else if (upgradeType === "dieSides") {
      return dieSidesUpgradeCost;
    }
  };
  const popover = document.getElementById("insufficientBountPointsPopover");

  const handleMenuUpgradeClick = (upgradeType) => {
    let upgradeCost;
    if (cost(upgradeType) > remainingBountyPoints) {
      popover.showPopover();
    } else {
      if (upgradeType === "dieCount") {
        upgradeCost = dieCountUpgradeCost;
      } else {
        upgradeCost = dieSidesUpgradeCost;
      }

      const newUpgrade = {
        cost: upgradeCost,
        stat: stat,
        jsonStatIndex: jsonStatIndex,
        upgradeType: upgradeType,
      };
      setUpgradesArray([...upgradesArray, newUpgrade]);
      setRemainingBountyPoints((previousValue) => previousValue - upgradeCost);
    }
  };

  return (
    <div className="menu" ref={menuRef}>
      <div
        className="menu__menu-item"
        onClick={() => {
          handleMenuUpgradeClick("dieCount");
        }}
      >
        <div className="menu__menu-item-label">Add an additional die</div>
        <div className="menu__menu-item-cost">{dieCountUpgradeCost}</div>
      </div>
      <div
        className="menu__menu-item"
        onClick={() => {
          handleMenuUpgradeClick("dieSides");
        }}
      >
        <div className="menu__menu-item-label">Upgrade die type</div>
        <div className="menu__menu-item-cost">{dieSidesUpgradeCost}</div>
      </div>
    </div>
  );
};

export default Menu;
