import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import CharacterCreator from './components/CharacterCreator/CharacterCreator';
import API from './components/API/API';
import Characters from './components/Characters/Characters';
import './App.css';

const App = () => {
  const [selectedPage, setSelectedPage] = useState('home');

  const renderPage = () => {
    switch (selectedPage) {
      case 'home':
        return <Home />;
      case 'chat':
        return <Chat />;
      case 'character-creator':
        return <CharacterCreator />;
      case 'api':
        return <API />;
      case 'characters':
        return <Characters />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Sidebar onSelect={setSelectedPage} selectedPage={selectedPage} />
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
