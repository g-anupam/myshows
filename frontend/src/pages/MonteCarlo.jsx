import React from 'react';
import './MonteCarlo.css';

const MonteCarlo = () => {
  return (
    <div className="MonteCarlo">
      <div className="poster-container">
        <img src="/api/placeholder/200/300" alt="Monte Carlo Poster" />
      </div>
      <div className="movie-info">
        <h2>Monte Carlo</h2>
        <p>
          Monte Carlo is a 2011 American romantic comedy film directed by Thomas Bezucha and starring Selena Gomez, Leighton Meester, and Katie Cassidy. The film follows a young woman who, on a trip to Paris with her best friend and future stepsister, is mistaken for a British heiress.
        </p>
        <h3>Cast:</h3>
        <ul>
          <li>Selena Gomez as Grace/Cordelia</li>
          <li>Leighton Meester as Emma</li>
          <li>Katie Cassidy as Meg</li>
        </ul>
        <h3>Director:</h3>
        <p>Thomas Bezucha</p>
      </div>
    </div>
  );
};

export default MonteCarlo;
