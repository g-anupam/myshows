import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./MonteCarlo.css";
import movie6 from '../../assets/movie6.jfif';

const MovieInfo = ({ onBuyTicketsClick }) => (
  <>
    <div className="poster-container">
      <img src={movie6} alt="Monte Carlo Poster" />
    </div>
    <div className="movie-info-card">
      <h2>Monte Carlo</h2>
      <p>
        Monte Carlo is a 2011 American romantic comedy film directed by Thomas Bezucha and starring Selena Gomez, Leighton Meester, and Katie Cassidy. The film follows a young woman who, on a trip to Paris with her best friend and future stepsister, is mistaken for a British heiress.
      </p>
      <br />
      <h3>Cast:</h3>
      <ul>
        <li>Selena Gomez as Grace/Cordelia</li>
        <li>Leighton Meester as Emma</li>
        <li>Katie Cassidy as Meg</li>
      </ul>
      <h3>Director:</h3>
      <p>Thomas Bezucha</p>
      <button onClick={onBuyTicketsClick}>Buy Tickets</button>
    </div>
  </>
);

const ShowTimes = ({ showTimes, onShowTimeSelect, selectedShowTime, onBackClick }) => (
  <div>
    <button onClick={onBackClick}>Back</button>
    <h3>Select a Show Time:</h3>
    {showTimes.map((showTime) => (
      <button
        key={showTime}
        onClick={() => onShowTimeSelect(showTime)}
        className={selectedShowTime === showTime ? 'selected' : ''}
      >
        {showTime}
      </button>
    ))}
  </div>
);

const SeatSelection = ({ selectedShowTime, onSeatCountSelect, selectedSeatCount, onBackClick }) => (
  <div>
    <button onClick={onBackClick}>Back</button>
    <h3>Select Number of Seats for {selectedShowTime}:</h3>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
      <button
        key={count}
        onClick={() => onSeatCountSelect(count)}
        className={selectedSeatCount === count ? 'selected' : ''}
      >
        {count}
      </button>
    ))}
  </div>
);

const Confirmation = ({ onBackClick }) => (
  <div>
    <button onClick={onBackClick}>Back</button>
    <h3>Confirmation</h3>
  </div>
);

const MonteCarlo = () => {
  const [step, setStep] = useState('movieInfo');
  const [selectedShowTime, setSelectedShowTime] = useState(null);
  const [selectedSeatCount, setSelectedSeatCount] = useState(null);
  const [requiresLogin, setRequiresLogin] = useState(false);

  const handleBuyTicketsClick = () => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      setRequiresLogin(true);
      return;
    }
    setStep('showTimes');
  };

  const handleShowTimeSelect = (showTime) => {
    setSelectedShowTime(showTime);
    setStep('seatSelection');
  };

  const handleSeatCountSelect = (count) => {
    setSelectedSeatCount(count);
    setStep('confirmation');
  };

  const handleBackClick = () => {
    if (step === 'confirmation') setStep('seatSelection');
    else if (step === 'seatSelection') setStep('showTimes');
    else if (step === 'showTimes') setStep('movieInfo');
  };

  const showTimes = ['9:00 AM', '10:30 AM', '12:00 PM', '3:30 PM', '5:00 PM', '7:45 PM'];

  if (requiresLogin) {
    return <Link to="/login" className="login-link">Please login to continue</Link>;
  }

  return (
    <div>
      {step === 'movieInfo' && <MovieInfo onBuyTicketsClick={handleBuyTicketsClick} />}
      {step === 'showTimes' && (
        <ShowTimes
          showTimes={showTimes}
          onShowTimeSelect={handleShowTimeSelect}
          selectedShowTime={selectedShowTime}
          onBackClick={handleBackClick}
        />
      )}
      {step === 'seatSelection' && (
        <SeatSelection
          selectedShowTime={selectedShowTime}
          onSeatCountSelect={handleSeatCountSelect}
          selectedSeatCount={selectedSeatCount}
          onBackClick={handleBackClick}
        />
      )}
      {step === 'confirmation' && <Confirmation onBackClick={handleBackClick} />}
    </div>
  );
};

export default MonteCarlo;
