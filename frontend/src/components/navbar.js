import React from 'react';
import '../styles/navbar.css';
import { NavLink, BrowserRouter } from 'react-router-dom';

const Navbar = () => {
    return(
        <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-custom bg-custom">
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="nav ">
                <li className="nav-item active">
                    <a href = '/' id='navlink'>Find</a>
                </li>
                <li className="nav-item">
                    <a href="/register" id='navlink'>Register</a>
                </li>
                <li className="nav-item">
                    <a href="/profile" id='navlink'>Profile</a>
                </li>
                </ul>
            </div>
        </nav>
        </BrowserRouter>
    );
}

export default Navbar;