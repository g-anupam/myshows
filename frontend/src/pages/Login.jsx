import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, passwd }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            sessionStorage.setItem('user', JSON.stringify(data.user));
            sessionStorage.setItem('token', data.token); // Optional token storage

            navigate('/');
        } catch (error) {
            console.error('Login Failed:', error);
            setError(error.message || 'An error occurred during login. Please try again.');
        }
    };

    return (
        <div className='homepage'>
            <header className='container'>
                <div className='top-bar'>
                    {/* <Link to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link> */}
                    {/* <input type="text" placeholder="Search..." className="search-bar" /> */}
                    {/* <a href="#login" className="login-link">
                        <i className="fas fa-user"></i> Login
                    </a> */}
                </div>
            </header>
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <div id="ediv">
                        <label>Email Address:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="input-field"
                            id="eid"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div id="pdiv">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="input-field"
                            id="pid"
                            value={passwd}
                            onChange={(e) => setPasswd(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="login-button" id="lb">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
