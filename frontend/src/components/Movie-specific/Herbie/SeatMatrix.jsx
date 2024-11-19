// Updated SeatMatrix.jsx (with fixed class name)
import './SeatMatrix.css';
const SeatMatrix = ({ showtime, selectedSeats, onSeatSelect, requiredSeats }) => {
  const getColorForSeat = (seat) => {
    if (seat.status === 'booked') return 'booked';
    if (selectedSeats.includes(seat.seatNumber)) return 'seat-selected';
    return 'available';
  };

  return (
    <div className="seat-matrix-container">
      <h3 className="seat-matrix-title">Select {requiredSeats} Seats:</h3>

      {/* Legend */}
      <div className="legend-container">
        <div className="legend-item">
          <div className="legend-box available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box seat-selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-box booked"></div>
          <span>Booked</span>
        </div>
      </div>
      <div className="seat-matrix-grid">
        {showtime.seatMatrix.map((row) => (
          <div key={row.row} className="seat-row-container">
            <span className="row-label">{row.row}</span>
            <div className="seat-row">
              {row.seats.map((seat) => (
                <button
                  key={seat.seatNumber}
                  disabled={seat.status === 'booked' || 
                            (selectedSeats.length >= requiredSeats && !selectedSeats.includes(seat.seatNumber))}
                  onClick={() => onSeatSelect(seat)}
                  className={`seat-button1 ${getColorForSeat(seat)}`}
                >
                  {seat.seatNumber.replace(row.row, '')}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Seats Summary */}
      <div className="seat-summary">
        <p>Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
        <p>Total Price: ${(selectedSeats.length * showtime.ticketPrice).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default SeatMatrix;
