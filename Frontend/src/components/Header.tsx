import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        Course-QA
      </div>
      <div className="profile-icon-container">
        <FontAwesomeIcon icon={faSignOut} onClick={() => {
          localStorage.removeItem('user');
          window.location.reload();
        }}/>
      </div>
    </header>
  );
};

export default Header;
