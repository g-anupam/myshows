import React from 'react';
import './ShowTimes.css';
const ShowTimes = ({ showTimes, onShowTimeSelect, selectedShowTime, onBackClick }) => {
  return (
    <div className='show-container'>
      <button onClick={onBackClick}>Back</button>
      <h3>Select a Show Time:</h3>
      {showTimes.map((showTime) => (
        <button id='show'
          key={showTime}
          onClick={() => onShowTimeSelect(showTime)}
          className={selectedShowTime === showTime ? 'selected' : ''}
        >
          {showTime}
        </button>
      ))}
    </div>
  );
};

export default ShowTimes;
