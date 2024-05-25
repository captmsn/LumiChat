import React from 'react';
import './Sidebar.css';
import { FaHome, FaComments, FaUserPlus, FaCogs, FaUsers } from 'react-icons/fa';

const Sidebar = ({ onSelect, selectedPage }) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li
          className={selectedPage === 'home' ? 'active' : ''}
          onClick={() => onSelect('home')}
        >
          <FaHome className="icon" /> Home
        </li>
        <li
          className={selectedPage === 'chat' ? 'active' : ''}
          onClick={() => onSelect('chat')}
        >
          <FaComments className="icon" /> Chat
        </li>
        <li
          className={selectedPage === 'character-creator' ? 'active' : ''}
          onClick={() => onSelect('character-creator')}
        >
          <FaUserPlus className="icon" /> Character Creator
        </li>
        <li
          className={selectedPage === 'api' ? 'active' : ''}
          onClick={() => onSelect('api')}
        >
          <FaCogs className="icon" /> API
        </li>
        <li
          className={selectedPage === 'characters' ? 'active' : ''}
          onClick={() => onSelect('characters')}
        >
          <FaUsers className="icon" /> Characters
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
