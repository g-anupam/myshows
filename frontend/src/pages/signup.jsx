import './signup.css';
import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png';

function Signup() {
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
            <br></br>
            <div className="signup-container">
                <form className='signup-form'>
                    <label>First Name:</label>
                    <input type="text" placeholder='Enter first name' className='input-field' />
                    <label>Last Name:</label>
                    <input type='text' placeholder='Enter last name' className='input-field' />
                    <label>Email Address:</label>
                    <input type='email' placeholder='Enter email address' className='input-field' />
                    <label>Password:</label>
                    <input type='password' placeholder='Enter password' className='input-field' />
                    <label>Reconfirm Password:</label>
                    <input type="password" placeholder="Re-enter password" className="input-field" />

                    <label>City:</label>
                    <input type="text" placeholder="Enter city" className="input-field" />

                    <label>State:</label>
                    <input type="text" placeholder="Enter state" className="input-field" />

                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
            </div>
            <br></br>
            
        </div>
    )
}

export default Signup;