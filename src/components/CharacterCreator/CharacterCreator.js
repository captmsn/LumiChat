import React, { useState } from 'react';
import './CharacterCreator.css';
const { ipcRenderer } = window.require('electron');

const CharacterCreator = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterImage, setCharacterImage] = useState(null);
  const [characterPersona, setCharacterPersona] = useState('');
  const [scenario, setScenario] = useState('');

  const handleImageChange = (e) => {
    setCharacterImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCharacter = {
      name: characterName,
      persona: characterPersona,
      scenario,
    };

    if (characterImage) {
      const reader = new FileReader();
      reader.onload = () => {
        newCharacter.image = reader.result;
        ipcRenderer.send('save-character', newCharacter, characterImage.path);
      };
      reader.readAsDataURL(characterImage);
    } else {
      ipcRenderer.send('save-character', newCharacter);
    }

    // Reset form
    setCharacterName('');
    setCharacterImage(null);
    setCharacterPersona('');
    setScenario('');
  };

  return (
    <div className="character-creator-container">
      <div className="character-creator">
        <h1>Create Character</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Character Name:
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Enter character name"
            />
          </label>
          <label>
            Character Image:
            <input
              type="file"
              onChange={handleImageChange}
            />
          </label>
          <label>
            Character Persona:
            <textarea
              value={characterPersona}
              onChange={(e) => setCharacterPersona(e.target.value)}
              placeholder="Enter character persona"
            />
          </label>
          <label>
            Scenario:
            <textarea
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="Enter scenario"
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="character-preview">
        <h2>Character Preview</h2>
        <div className="preview-details">
          <img src={characterImage ? URL.createObjectURL(characterImage) : "https://via.placeholder.com/150"} alt="Character Preview" />
          <p><strong>{characterName || "Character name will be shown here..."}</strong></p>
          <p>{characterPersona || "Character description will be shown here..."}</p>
          <p>{scenario || "Scenario will be shown here..."}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreator;
