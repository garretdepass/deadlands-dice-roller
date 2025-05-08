import React from "react";
import { Link } from 'react-router-dom';

const CharacterView = ({character}) => {

return (
    <div>
        <div>{character.name}</div>
        <Link to="/">Change Character</Link>
    </div>
)

}

export default CharacterView