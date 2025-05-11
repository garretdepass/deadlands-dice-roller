import React, { useState, useEffect } from 'react';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch('/.netlify/functions/get_characters');
      const data = await response.json();
      console.log(`in app.jsx, the data variable is ${data[0].name}`)
      setCharacters(data);
    }
    fetchData();
  }, []);



  return (
    <div className="App">
      <h1>Who's Playing?</h1>
      { (characters.length === 0) && <div>No Characters...</div> || <div class="restaurant-grid">
        {characters.map(character => (
          <div key={character.id} class="restaurant-tile">
            <img src={character.imageSrc} style={{height: "200px", width: "200px"}} />
            <h2>{character.name}</h2>
          </div>
        ))}
        </div>
      }
    </div> 
  );
}

export default App;


