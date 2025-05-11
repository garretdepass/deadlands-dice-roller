import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeView = () => {
  const [characters, setCharacters] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch('/.netlify/functions/get_characters');
      const data = await response.json();
      setCharacters(data);
    }
    fetchData();
  }, []);



  return (
    <div>
      <h1>Who's Playing?</h1>
      { (characters.length === 0) && <div>No Characters...</div> || <div className="restaurant-grid">
        {characters.map(character => (
          <Link to={"/" + character.name} key={character.name} className="restaurant-tile">
            <img src={character.imageSrc} style={{height: "200px", width: "200px"}} />
            <h2>{character.name}</h2>
          </Link>
        ))}
        </div>
      }
    </div> 
  );
}

export default HomeView;
