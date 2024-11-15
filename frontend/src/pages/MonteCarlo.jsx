import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import "./MonteCarlo.css";
import movie7 from "../../assets/movie7.jpg";
import ShowTimes from "../components/ShowTimes.jsx";
import SeatSelection from "../components/SeatSelection.jsx";
import Confirmation from "../components/Confirmation.jsx";

const MovieInfo = ({ onBuyTicketsClick }) => (  
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

const MonteCarlo = () => {
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
    setStep('showTimes'); 
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
      {step === "movieInfo" && <MovieInfo onBuyTicketsClick={handleBuyClick} />}  
      {step === "showTimes" && (  
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
      {step === 'confirmation' && (
        <Confirmation
          selectedShowTime={selectedShowTime}
          selectedSeatCount={selectedSeatCount}
          onBackClick={handleBackClick}
        />
      )}
    </>
  )
}

export default MonteCarlo;
