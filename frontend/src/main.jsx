import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './main.css'
import RightButton from './components/rightButton'
import Movies from './components/Movies'
import logo from '../assets/logo3.png'
import ToggleTheme from './components/ToggleTheme'
import Signup from './pages/signup';
import Login from './pages/Login';
import MonteCarlo from './pages/MonteCarlo';
import Herbie from './pages/Herbie';
import Terminator from './pages/Terminator';
import ZNMD from './pages/znmd';
import Payments from './pages/Payments';
import BookedShows from './pages/BookedShows';
import FirstName from './components/FirstName';
import StripePayment from './pages/StripePayment';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ToggleTheme />
      <FirstName />
      <header className="header-container">
        <div className="logo-container">
          <img src={logo} alt="TicketVerse Logo" className="logo-image" />
        </div>

        <div className="heading-wrapper">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 className="site-heading">TicketVerse</h1>
          </Link>
        </div>
        <RightButton />
      </header>

      <main className="content">
        <div className="contentdiv1">
          <h2 id="desc">Your Front Row Seat to Every Adventure!</h2>
        </div>

        <Routes>
          <Route path="/" element={
            <>
              <div id="movies">
                <Movies />
              </div>
              <br /><br /><br />
              <div id="about">
                <h2>About us:</h2>
                <p>Welcome to TicketVerse: your ultimate destination for seamless movie bookings and unforgettable cinematic experiences! At TicketVerse, we’re passionate about bringing the magic of movies to you with ease and convenience. Explore showtimes, book tickets, and secure your front-row seat to the latest blockbusters, all in just a few clicks. Join us and dive into a universe of entertainment, where every film journey begins with TicketVerse.</p>
                <br />
                <h3>Developers:</h3>
                <h3 id="names">
                  <a id="names" href="https://github.com/AyushChakraborty">Ayush Chakraborty</a>
                  <br />
                  <a id="names" href="https://github.com/g-anupam">Anupam G</a>
                  <br />
                  <a id="names" href="https://github.com/Archit-Rode">Archit Rode</a>
                  <br />
                </h3>
              </div>
            </>
          } />
          <Route path="/monte-carlo" element={<MonteCarlo />} />
          <Route path="/herbie" element={<Herbie />} />
          <Route path='/terminator'  element={<Terminator />} />
          <Route path='znmd' element={<ZNMD />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/bookedshows" element={<BookedShows />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/stripepayment" element={<StripePayment />} />
        </Routes>
      </main>
    </Router>
  </StrictMode>
)
