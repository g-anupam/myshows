import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import movie10 from "../../assets/movie10.jpg";
import ShowTimes from "../components/Common/ShowTimes.jsx";
import SeatSelection from "../components/Common/SeatSelection.jsx";
import Confirmation from "../components/Movie-specific/ZNMD/Confirmation.jsx";

const MovieInfo = ({ onBuyTicketsClick }) => (
    <>
        <div className="poster-container">
            <img src={movie10} alt="ZNMD Poster" />
        </div>
        <div className="movie-info-card">
            <h2>Zindagi Na Milegi Dobara</h2>
            <p>
            Zindagi Na Milegi Dobara (transl. Life Will Never Come Again), is a 2011 Indian Hindi-language road comedy drama film directed by Zoya Akhtar and produced by Farhan Akhtar and Ritesh Sidhwani under Excel Entertainment.
            The film's story follows three childhood friends, Arjun, Kabir, and Imran, who reunite for a three-week road trip. They set off to Spain and meet Laila, who falls in love with Arjun and helps him overcome his compulsion to work.
            </p>
            <br />
            <h3>Cast:</h3>
            <ul>
                <li>Farhan Akhtar as Imran</li>
                <li>Abhay Deol as Kabir</li>
                <li>Hrithik Roshan as Arjun</li>
                <li>Katrina Kaif as Laila</li>
            </ul>
            <h3>Director:</h3>
            <p>Zoya Akhtar</p>
            <button onClick={onBuyTicketsClick}>Buy Tickets</button>
        </div>
    </>
);

const Terminator = () => {
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

export default Terminator;
