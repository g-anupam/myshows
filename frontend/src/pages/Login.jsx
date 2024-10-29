import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => (
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
            <form className="login-form">

                <div id="ediv">
                    <label>Email Address:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input-field"
                        id="eid"
                    />
                </div>
                    
                <div id="pdiv">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="input-field"
                        id="pid"
                    />
                </div>

                <button type="submit" className="login-button" id="lb">Login</button>
            </form>
            <p className="signup-link">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    </div>
);
export default Login;