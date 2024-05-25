import React, { useState, useEffect } from 'react';
import './Characters.css';

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Retrieve characters from local storage or an API
    const storedCharacters = JSON.parse(localStorage.getItem('characters')) || [];
    setCharacters(storedCharacters);
  }, []);

  return (
    <div className="characters">
      <h1>Characters</h1>
      <div className="character-list">
        {characters.map((character, index) => (
          <div className="character-card" key={index}>
            {character.image && <img src={character.image} alt={character.name} />}
            <h2>{character.name}</h2>
            <p><strong>Persona:</strong> {character.persona}</p>
            <p><strong>Scenario:</strong> {character.scenario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
