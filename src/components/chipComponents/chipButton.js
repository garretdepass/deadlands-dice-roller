import * as React from 'react'
import { buttonStyling } from './chipButton.module.css'

const ChipButton = (props) => {
    return (
        <button className={buttonStyling}>{props.text}</button>
    )
}

export default ChipButton