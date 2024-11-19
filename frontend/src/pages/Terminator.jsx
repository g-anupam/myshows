import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import "./Herbie.css"; // Updated to Herbie.css
import movie9 from "../../assets/movie9.jpg"; // Correct image reference for Herbie
import ShowTimes from "../components/Common/ShowTimes.jsx";
import SeatSelection from "../components/Common/SeatSelection.jsx";
import Confirmation from "../components/Movie-specific/Terminator/Confirmation.jsx";
// import SeatMatrix from "./SeatMatrix.jsx"; // Specific to Herbie

const MovieInfo = ({ onBuyTicketsClick }) => (
    <>
        <div className="poster-container">
            <img src={movie9} alt="Herbie Poster" />
        </div>
        <div className="movie-info-card">
            <h2>TERMINATOR 2: JUDGEMENT DAY</h2>
            <p>
            Terminator 2: Judgment Day[a] is a 1991 American science fiction action film directed by James Cameron, who co-wrote the script with William Wisher. Starring Arnold Schwarzenegger, Linda Hamilton and Robert Patrick, it is the sequel to The Terminator (1984) and is the second installment in the Terminator franchise.
            </p>
            <br />
            <h3>Cast:</h3>
            <ul>
                <li>Arnold Schwarzenegger as The Terminator T-800</li>
                <li>Linda Hamilton as Sarah Connor</li>
                <li>Edward Furlong as John Connor</li>
                <li>Robert Patrick as T-1000</li>
            </ul>
            <h3>Director:</h3>
            <p>James Cameron</p>
            <button onClick={onBuyTicketsClick}>Buy Tickets</button>
        </div>
    </>
);

const Terminator = () => {
    const [step, setStep] = useState('movieInfo');
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [selectedSeatCount, setSelectedSeatCount] = useState(null);
    const [requiresLogin, setRequiresLogin] = useState(false);

    const showTimes = ['9:30 AM', '11:00 AM', '12:30 PM', '4:00 PM', '5:30 PM', '8:15 PM'];

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

export default Terminator;
