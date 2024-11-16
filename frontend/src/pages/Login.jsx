import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import userIcon from '../../assets/user-icon1.png'; // Ensure this path matches your folder structure

const Login = () => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, passwd }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userPassword', passwd); // Matching with signup storage
            console.log("first name from login page: ", data.user.firstName);
            sessionStorage.setItem('userFirstName', data.user.firstName);
            console.log('session stored first name: ', sessionStorage.getItem('userFirstName'));

            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            console.error('Login Failed:', error);
            setError(error.message || 'An error occurred during login. Please try again.');
        }
    };

    return (
        <div className='homepage'>
            <header className='container'>
                <div className='top-bar'>
                    {/* Add logo or navigation as needed */}
                </div>
            </header>
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    {/* User icon */}
                    <div className="icon-container">
                        <img src={userIcon} alt="User Icon" className="user-icon" />
                    </div>

                    <div className="input-container">
                        <label>Email Address:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-container">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input-field"
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
