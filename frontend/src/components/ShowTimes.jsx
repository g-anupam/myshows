const ShowTimes = ({ showTimes, onShowTimeSelect, selectedShowTime, onBackClick }) => {
  return (
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
  )
}

export default ShowTimes;

