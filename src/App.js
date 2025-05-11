import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CharacterView from './components/character_view.js';
import HomeView from './components/home_view.js';

function App() {
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
    <BrowserRouter className="App">
      <Routes>
        <Route index element={<HomeView />} />
        {characters.map(character => (
          <Route
          key={character.name} 
          path={"/" + character.name} 
          element={<CharacterView character={character} />} 
          class="restaurant-tile"
          />
        ))}
      </Routes>
        {/* {window.onload = () => {
          let navigate = useNavigate;
          navigate("/")
        }} */}
    </BrowserRouter> 
  );
}

export default App;
