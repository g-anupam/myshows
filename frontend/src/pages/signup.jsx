import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure the path is correct

function Signup() {
    // Define state for each input field
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [repasswd, setRePasswd] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwd !== repasswd) {
            setError('Passwords do not match!');
            return;
        }

        const userData = { firstName, lastName, email, passwd, city, state };

        try {
            const response = await fetch('http://localhost:3000/signup', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                setSuccessMessage('User created successfully!');
                setError('');
                // Reset input fields
                setFirstName('');
                setLastName('');
                setEmail('');
                setPasswd('');
                setRePasswd('');
                setCity('');
                setState('');
            } else {
                const data = await response.json();
                setError(data.message || 'Signup Failed, please try again!');
                setSuccessMessage('');
            }
        } catch (err) {
            console.error('Error during signup:', err);
            setError('An unexpected error occurred. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='homepage'>
            <header className='container'>
                <div className='top-bar'>
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>
            </header>
            <br />
            <div className="signup-container">
                <form className='signup-form' onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder='Enter first name'
                        className='input-field'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>Last Name:</label>
                    <input
                        type='text'
                        placeholder='Enter last name'
                        className='input-field'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Email Address:</label>
                    <input
                        type='email'
                        placeholder='Enter email address'
                        className='input-field'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password:</label>
                    <input
                        type='password'
                        placeholder='Enter password'
                        className='input-field'
                        value={passwd}
                        onChange={(e) => setPasswd(e.target.value)}
                    />
                    <label>Reconfirm Password:</label>
                    <input
                        type="password"
                        placeholder="Re-enter password"
                        className="input-field"
                        value={repasswd}
                        onChange={(e) => setRePasswd(e.target.value)}
                    />
                    <label>City:</label>
                    <input
                        type="text"
                        placeholder="Enter city"
                        className="input-field"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label>State:</label>
                    <input
                        type="text"
                        placeholder="Enter state"
                        className="input-field"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <button type="submit" className="signup-button">Sign Up</button>
                    
                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </form>
            </div>
            <br />
        </div>
    );
}

export default Signup;
