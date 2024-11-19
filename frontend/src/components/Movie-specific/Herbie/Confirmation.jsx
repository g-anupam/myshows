import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SeatMatrix from "./SeatMatrix.jsx";

const Confirmation = ({
  selectedShowTime,
  selectedSeatCount,
  onBackClick,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtime, setShowtime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimeData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/seats/showtime`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ showTime: selectedShowTime }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch showtime data: ${response.statusText}`);
        }

        const data = await response.json();
        setShowtime(data);
      } catch (err) {
        console.error("Error fetching showtime data:", err);
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
      if (prev.length >= selectedSeatCount) return prev;
      return [...prev, seat.seatNumber];
    });
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length !== selectedSeatCount) {
      alert('Please select all required seats');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/seats/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showtimeId: showtime._id,
          seats: selectedSeats,
          userEmail: sessionStorage.getItem('userEmail'),
        }),
      });

      if (!response.ok) throw new Error('Booking failed');
      navigate("/payments");
    } catch (err) {
      alert('Failed to confirm booking: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!showtime) return <div>No showtime data available</div>;

  return (
    <div className="confirmation-container">
      <button onClick={onBackClick} className="back-button">Back</button>
      <div className="confirmation-header">
        <h2>Seat Selection</h2>
        <p>Show Time: {selectedShowTime}</p>
        <p>Number of Seats: {selectedSeatCount}</p>
      </div>
      <SeatMatrix
        showtime={showtime}
        selectedSeats={selectedSeats}
        onSeatSelect={handleSeatSelect}
        requiredSeats={selectedSeatCount}
      />
      <div className="confirmation-footer">
        <button
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length !== selectedSeatCount}
          className={`confirm-button ${selectedSeats.length !== selectedSeatCount ? 'disabled' : ''}`}
        >
          Proceed to Payments
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
