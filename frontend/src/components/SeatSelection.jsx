import './SeatSelection.css';
const SeatSelection = ({ selectedShowTime, onSeatCountSelect, selectedSeatCount, onBackClick }) => {
  return (
    <div className="seat-selection-container">
      <button className="back-button" onClick={onBackClick}>Back</button>
      <h3 className="seat-selection-title">Select Number of Seats for {selectedShowTime}:</h3>
      <div className="seat-buttons-container">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
          <button
            key={count}
            onClick={() => onSeatCountSelect(count)}
            className={`seat-button ${selectedSeatCount === count ? 'selected' : ''}`}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;


