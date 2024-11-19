import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userIcon from '../../assets/user-icon1.png'; // Ensure this path matches your folder structure

const Login = () => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [error, setError] = useState('');
    const [userDetails, setUserDetails] = useState(null); // State to store user details if logged in
    const navigate = useNavigate();

    // Check if the user is already logged in on component mount
    useEffect(() => {
        const storedEmail = sessionStorage.getItem('userEmail');
        const storedFirstName = sessionStorage.getItem('userFirstName');
        const storedLastName = sessionStorage.getItem('userLastName');
        // const storedCity = sessionStorage.getItem('userCity');
        // const storedState = sessionStorage.getItem('userState');

        if (storedEmail && storedFirstName && storedLastName) {
            setUserDetails({
                firstName: storedFirstName,
                lastName: storedLastName,
                email: storedEmail,
                // city: storedCity,
                // state: storedState,
            });
        }else {
            setUserDetails(null);
        }
    }, []);

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

            // Store user details in sessionStorage
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userFirstName', data.user.firstName);
            sessionStorage.setItem('userLastName', data.user.lastName);
            // sessionStorage.setItem('userCity', data.user.city);
            // sessionStorage.setItem('userState', data.user.state);

            // Update userDetails state and trigger sessionStorage event
            setUserDetails({
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                email,
                // city: data.user.city,
                // state: data.user.state,
            });

            window.dispatchEvent(new Event('sessionStorageUpdated'));
            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            console.error('Login Failed:', error);
            setError(error.message || 'An error occurred during login. Please try again.');
        }
    };

    const handleDeleteUser = async () => {
      try {
        const userEmail = sessionStorage.getItem('userEmail');
        const response = await fetch('http://localhost:3000/auth/delete-user', {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete user');
        }

        // Clear session storage and redirect to login
        sessionStorage.clear();
        setUserDetails(null);
        window.dispatchEvent(new Event('sessionStorageUpdated'));
        navigate('/login');
      } catch (error) {
        console.error('Delete User Failed:', error);
        // Optionally set an error state to show to the user
        setError(error.message || 'An error occurred while deleting the user');
      } 
    }

    // If user is already logged in, display their details
    if (userDetails) {
        return (
            <div className="user-details-container">
                <h2>Welcome Back!</h2>
                <p><strong>First Name:</strong> {userDetails.firstName}</p>
                <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                {/* <p><strong>City:</strong> {userDetails.city}</p>
                <p><strong>State:</strong> {userDetails.state}</p> */}
                <button
                    onClick={() => {
                        sessionStorage.clear();
                        setUserDetails(null);
                        navigate('/login'); // Redirect to login after logout
                        window.dispatchEvent(new Event('sessionStorageUpdated'));
                    }}
                >
                    Logout
                </button>
                <button className="deleteuser" onClick={handleDeleteUser}>
                  Delete User
                </button>
            </div>
        );
    }

    // Login form if user is not logged in
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
