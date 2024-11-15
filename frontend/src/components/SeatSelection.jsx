const SeatSelection = ({ selectedShowTime, onSeatCountSelect, selectedSeatCount, onBackClick }) => {
  return (
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
  )
}

export default SeatSelection;

