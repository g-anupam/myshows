import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./MonteCarlo.css";
import movie7 from "../../assets/movie7.jpg";
import ShowTimes from "../components/ShowTimes.jsx";

const MovieInfo = ({ onBuyTicketsClick }) => (  // Note the prop name
  <>
    <div className="poster-container">
      <img src={movie7} alt="Monte Carlo Poster" />
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

const Montecarlo = () => {
  const [step, setStep] = useState('movieInfo');
  const [selectedShowTime, setSelectedShowTime] = useState(null);
  const [selectedSeatCount, setSelectedSeatCount] = useState(null);
  const [requiresLogin, setRequiresLogin] = useState(false);

  const showTimes = ['9:00 AM', '10:30 AM', '12:00 PM', '3:30 PM', '5:00 PM', '7:45 PM'];

  const handleBuyClick = () => {
    const userEmail = sessionStorage.getItem('userEmail');
    if (!userEmail) {
      setRequiresLogin(true);
      return;
    }
    setStep('showTimes');  // Note the capitalization
  }

  const handleShowTimeSelect = (showTime) => {
    console.log("Selected show time : ", showTime);
    setSelectedShowTime(showTime);
    setStep('seatSelection');
  }

  const handleBackClick = () => {
    console.log("Going back from step : ", step);
    if (step === "confirmation") {
      setStep("seatSelection");
    } else if (step === "seatSelection") {
      setStep("showTimes");
    } else if (step === "showTimes") {
      setStep("movieInfo");
    }
  }

  const handleSeatCountSelect = (count) => {
    console.log("Selected seat count : ", count);
    setSelectedSeatCount(count);
    setStep("confirmation");
  }

  if (requiresLogin) {
    return <Link to="/login" className="loginLink"> Please Login to continue </Link>;
  }

  return (
    <>
      <h1>Hello, world </h1>
      {step === "movieInfo" && <MovieInfo onBuyTicketsClick={handleBuyClick} />}  {/* Fixed prop name */}
      {step === "showTimes" && (  // Fixed capitalization
        <ShowTimes 
          showTimes={showTimes}
          onShowTimeSelect={handleShowTimeSelect}
          selectedShowTime={selectedShowTime}
          onBackClick={handleBackClick}
        />
      )}  {/* Removed semicolon */}
    </>
  )
}

export default Montecarlo;
