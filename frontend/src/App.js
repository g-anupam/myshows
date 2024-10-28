import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import UserProfile from './pages/UserProfile';
import signup from './pages/signup';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/book/:id" element={<SeatSelection />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path='/signup' Component={signup} />
        </Routes>
    </Router>
);

export default App;