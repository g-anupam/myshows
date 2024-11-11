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

const SeatMatrix = ({ showtime, selectedSeats, onSeatSelect, requiredSeats }) => {
  const getColorForSeat = (seat) => {
    if (seat.status === 'booked') return 'bg-gray-400 cursor-not-allowed';
    if (selectedSeats.includes(seat.seatNumber)) return 'bg-green-500 hover:bg-green-600';
    return 'bg-blue-500 hover:bg-blue-600';
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-bold">Select {requiredSeats} Seats:</h3>
      <div className="flex justify-center mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        {showtime.seatMatrix.map((row) => (
          <div key={row.row} className="flex gap-2 justify-center">
            <span className="w-8 text-center font-bold">{row.row}</span>
            <div className="flex gap-2">
              {row.seats.map((seat) => (
                <button
                  key={seat.seatNumber}
                  disabled={seat.status === 'booked' || 
                           (selectedSeats.length >= requiredSeats && 
                            !selectedSeats.includes(seat.seatNumber))}
                  onClick={() => onSeatSelect(seat)}
                  className={`w-8 h-8 rounded ${getColorForSeat(seat)} 
                            text-white text-sm font-bold
                            disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {seat.seatNumber.replace(row.row, '')}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total Price: ${(selectedSeats.length * showtime.ticketPrice).toFixed(2)}</p>
      </div>
    </div>
  );
};

const Confirmation = ({ 
  selectedShowTime, 
  selectedSeatCount,
  onBackClick,
  showtimeData,  // This will be fetched from MongoDB
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtime, setShowtime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowtimeData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/showtimes/${selectedShowTime}`);
        if (!response.ok) throw new Error('Failed to fetch showtime data');
        const data = await response.json();
        setShowtime(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimeData();
  }, [selectedShowTime]);

  const handleSeatSelect = (seat) => {
    setSelectedSeats(prev => {
      if (prev.includes(seat.seatNumber)) {
        return prev.filter(s => s !== seat.seatNumber);
      }
      if (prev.length >= selectedSeatCount) {
        return prev;
      }
      return [...prev, seat.seatNumber];
    });
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length !== selectedSeatCount) {
      alert('Please select all required seats');
      return;
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showtimeId: showtime._id,
          seats: selectedSeats,
          userEmail: sessionStorage.getItem('userEmail'),
        }),
      });

      if (!response.ok) throw new Error('Booking failed');

      // Handle successful booking
      alert('Booking confirmed!');
      // Redirect to booking confirmation page or handle as needed
    } catch (err) {
      alert('Failed to confirm booking: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!showtime) return <div>No showtime data available</div>;

  return (
    <div className="p-4">
      <button onClick={onBackClick} className="mb-4">Back</button>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Seat Selection</h2>
        <p>Show Time: {selectedShowTime}</p>
        <p>Number of Seats: {selectedSeatCount}</p>
      </div>

      <SeatMatrix
        showtime={showtime}
        selectedSeats={selectedSeats}
        onSeatSelect={handleSeatSelect}
        requiredSeats={selectedSeatCount}
      />

      <div className="mt-6 text-center">
        <button
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length !== selectedSeatCount}
          className="bg-blue-500 text-white px-6 py-2 rounded
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};
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
      {step === 'confirmation' && (
        <Confirmation 
          selectedShowTime={selectedShowTime}
          selectedSeatCount={selectedSeatCount}
          onBackClick={handleBackClick}
        />
      )}
    </div>
  );
};

export default MonteCarlo;
