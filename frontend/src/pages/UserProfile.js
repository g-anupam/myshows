import React from 'react';
import './Home.css';
import './UserProfile.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
const UserProfile = () => (
    <div className='homepage'>
        <header className='container'>
            <div className='top-bar'>
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
                <input type="text" placeholder="Search..." className="search-bar" />
                <a href="#login" className="login-link">
                    <i className="fas fa-user"></i> Login
                </a>
            </div>
        </header>
        <div className="login-container">
            <form className="login-form">
                <label>Email Address:</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-field"
                />

                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="input-field"
                />

                <button type="submit" className="login-button">Login</button>
            </form>
            <p className="signup-link">
                Don’t have an account? <a href="/signup">Sign up</a>
            </p>
        </div>
    </div>
);
export default UserProfile;