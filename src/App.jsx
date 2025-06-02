import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CharacterView from "./components/character_view";
import HomeView from "./components/home_view";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/.netlify/functions/get_characters");
        const data = await response.json();
        setCharacters(data);
      } catch {
        console.log("test error");
      }
    };
    fetchData();
  }, []);

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route index element={<HomeView characters={characters} />} />
        {characters.map((character, characterIndex) => (
          <Route
            key={character.name}
            path={"/" + character.name}
            element={
              <CharacterView
                character={character}
                characterIndex={characterIndex}
              />
            }
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
