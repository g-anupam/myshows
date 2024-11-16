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

  // Fetch showtime data on component mount
  useEffect(() => {
    const fetchShowtimeData = async () => {
      //console.log("Fetching showtime data for:", selectedShowTime);
      try {
        //const encodedShowTime = encodeURIComponent(selectedShowTime);
        console.log(selectedShowTime);
        const response = await fetch(`http://localhost:3000/seats/showtime`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ showTime: selectedShowTime })
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch showtime data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Showtime data fetched successfully within /showtime api call:", data);
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

  // Handle seat selection
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

  // Confirm booking by sending selected seats to the server
  const handleConfirmBooking = async () => {
    if (selectedSeats.length !== selectedSeatCount) {
      alert('Please select all required seats');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/seats/book', {
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
      console.log("logging right after the api call");
      console.log("Recieved items : ", showtime._id, selectedSeats, sessionStorage.getItem("userEmail"));
      if (!response.ok) throw new Error('Booking failed');

      // alert('Booking confirmed!');
      //after this go to Payments.jsx page
      navigate("/payments");
    } catch (err) {
      alert('Failed to confirm booking: ' + err.message);
    }

  };

  // Render loading, error, or main content
  if (loading) {
    console.log("Loading showtime data...");
    return <div>Loading...</div>;
  }
  if (error) {
    console.error("Error:", error);
    return <div>Error: {error}</div>;
  }
  if (!showtime) {
    console.log("No showtime data available");
    return <div>No showtime data available</div>;
  }

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
          Proceed to Payments
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
