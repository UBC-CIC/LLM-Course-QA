import './Header.css';
import { Avatar, AvatarFallback, AvatarImage } from "../avatar/Avatar"

const Header = () => {
    return (
        <header className="header">
            <div className='logo-container ml-6'>
                LOGO
            </div>

            <div className="logo-container">
                Course Q&A
            </div>
            <div className="profile-icon-container mr-6">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
};

export default Header;