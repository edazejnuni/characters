import React from 'react';
import './Header.scss';

const Header = ({ isAuthenticated, handleLogout }) => {
    console.log(isAuthenticated)
    return (
        <div className='header__container'>
            <h2>STARWARS CHARACTERS</h2>
            {isAuthenticated && (
                <a href="/login" onClick={handleLogout}>Logout</a>
            )}
        </div>
    );
}

export default Header;
