import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        Placeholder
      </div>
      <div className="profile-icon-container">
        <FontAwesomeIcon icon={faUser} />
      </div>
    </header>
  );
};

export default Header;
