import React, {useState} from "react";
import ChipButton from "./chipButton";
import {chipCounter} from './chipCounter.module.css'

function ChipCounter () {
    return (
        <div className={chipCounter}>
            <ChipButton />
            <ChipButton />
            <ChipButton />
            <ChipButton />
        </div>
    )
}

export default ChipCounter