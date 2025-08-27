import React from 'react';

// Navbar component for navigation
const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/register">Register</a>
                </li>
                <li>
                    <a href="/contacts">Contacts</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;