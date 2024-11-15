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
                    (selectedSeats.length >= requiredSeats && !selectedSeats.includes(seat.seatNumber))}
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
}

export default SeatMatrix;
