import React from 'react';
import '../styles/navbar.css';
import { BrowserRouter } from 'react-router-dom';

const Navbar = () => {
    return(
        // <BrowserRouter>
        <nav class="navbar navbar-expand-lg navbar-light bg-custom">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/" id='navlink'>Find</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id='navlink' href="/register">Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/profile" id='navlink'>Profile</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        // </BrowserRouter>
    );
}

export default Navbar;