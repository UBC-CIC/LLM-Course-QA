import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
    <div className='logo-container ml-6'>
        LOGO
    </div>

      <div className="logo-container">
        Course-QA
      </div>
      <div className="profile-icon-container mr-6">
        <FontAwesomeIcon icon={faSignOut} onClick={() => {
          localStorage.removeItem('user');
          window.location.reload();
        }}/>
      </div>
    </header>
  );
};

export default Header;