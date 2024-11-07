import React, { useState } from 'react';
import './MonteCarlo.css';
import movie6 from '../../assets/movie6.jfif';

const MonteCarlo = () => {
  const [showTimeOptionsVisible, setShowTimeOptionsVisible] = useState(false);
  const [selectedShowTime, setSelectedShowTime] = useState(null);
  const [selectedSeatCount, setSelectedSeatCount] = useState(null);

  const handleBuyTicketsClick = () => {
    setShowTimeOptionsVisible(true);
  };

  const handleShowTimeSelect = (showTime) => {
    setSelectedShowTime(showTime);
    setSelectedSeatCount(null);
  };

  const handleSeatCountSelect = (count) => {
    setSelectedSeatCount(count);
    // Proceed to the next step, such as payment or confirmation
  };

  const showTimes = ['9:00 AM', '10:30 AM', '12:00 PM', "3:30 PM", "5:00 PM", "7:45 PM"];

  return (
    <div className="MonteCarlo">
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
        <button onClick={handleBuyTicketsClick}>Buy Tickets</button>
        {showTimeOptionsVisible && (
          <div>
            <h3>Select a Show Time:</h3>
            {showTimes.map((showTime) => (
              <button
                key={showTime}
                onClick={() => handleShowTimeSelect(showTime)}
                className={selectedShowTime === showTime ? 'selected' : ''}
              >
                {showTime}
              </button>
            ))}
            {selectedShowTime && (
              <div>
                <h3>Select Number of Seats:</h3>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
                  <button
                    key={count}
                    onClick={() => handleSeatCountSelect(count)}
                    className={selectedSeatCount === count ? 'selected' : ''}
                  >
                    {count}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonteCarlo;
