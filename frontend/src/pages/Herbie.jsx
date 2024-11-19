import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import "./Herbie.css"; // Updated to Herbie.css
import movie8 from "../../assets/movie8.jpg"; // Correct image reference for Herbie
import ShowTimes from "../components/Common/ShowTimes.jsx";
import SeatSelection from "../components/Common/SeatSelection.jsx";
import Confirmation from "../components/Movie-specific/Herbie/Confirmation.jsx";
// import SeatMatrix from "./SeatMatrix.jsx"; // Specific to Herbie

const MovieInfo = ({ onBuyTicketsClick }) => (
    <>
        <div className="poster-container">
            <img src={movie8} alt="Herbie Poster" />
        </div>
        <div className="movie-info-card">
            <h2>HERBIE: FULLY LOADED</h2>
            <p>
                Herbie: Fully Loaded is a 2005 American sports comedy film directed by Angela Robinson from a screenplay by Thomas Lennon, Robert Ben Garant, and Smallville developers Alfred Gough and Miles Millar. The film is the sixth and final installment in the Herbie film series, following the television film The Love Bug (1997), and the first theatrical film since Herbie Goes Bananas (1980).
            </p>
            <br />
            <h3>Cast:</h3>
            <ul>
                <li>Lindsay Lohan as Maggie Peyton</li>
                <li>Matt Dillon as Trip Murphy</li>
                <li>Michael Keaton as Ray Peyton Sr.</li>
                <li>Justin Long as Kevin</li>
            </ul>
            <h3>Director:</h3>
            <p>Angela Robinson</p>
            <button onClick={onBuyTicketsClick}>Buy Tickets</button>
        </div>
    </>
);

const Herbie = () => {
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
    };

    const handleShowTimeSelect = (showTime) => {
        console.log("Selected show time : ", showTime);
        setSelectedShowTime(showTime);
        setStep('seatSelection');
    };

    const handleBackClick = () => {
        console.log("Going back from step : ", step);
        if (step === "confirmation") {
            setStep("seatSelection");
        } else if (step === "seatSelection") {
            setStep("showTimes");
        } else if (step === "showTimes") {
            setStep("movieInfo");
        }
    };

    const handleSeatCountSelect = (count) => {
        console.log("Selected seat count : ", count);
        setSelectedSeatCount(count);
        setStep("confirmation");
    };

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
    );
};

export default Herbie;
