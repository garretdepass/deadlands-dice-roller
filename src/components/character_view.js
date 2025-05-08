import React from "react";
import { Link } from 'react-router-dom';

const CharacterView = ({character}) => {

return (
    <div>
        <div>{character.name}</div>
        <div>Pace: {character.stats.pace}</div>
        <Link to="/">Change Character</Link>
    </div>
)

}

export default CharacterView