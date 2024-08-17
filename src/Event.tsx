import React, { useState } from 'react';

const eventStyle = {
  padding: '20px',
  backgroundColor: '#2E236C', // Theme color
  borderRadius: '8px',
  maxWidth: '300px',
  cursor: 'pointer',
  margin: '20px',
  color: '#C8ACD6',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between' // Ensure spacing inside the card is balanced
};

export const Event = ({ title, image, date, location, onClick, isSelected }) => {
  const [showVideoButton, setShowVideoButton] = useState(false);

  const handleRSVP = (e) => {
    e.stopPropagation(); // Prevent event grid click
    setShowVideoButton(true);
  };

  return (
    <div onClick={onClick} style={isSelected ? { ...eventStyle, maxWidth: '400px' } : eventStyle}>
      <img src={image} alt={title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
      <div style={{ textAlign: 'left', width: '100%' }}>
        <h2 style={{ margin: '10px 0 5px' }}>{title}</h2>
        <p style={{ fontSize: '0.9em', margin: '5px 0' }}>Discover essential strategies and innovations.</p>
        <p style={{ fontSize: '0.8em', fontWeight: 'bold', margin: '5px 0' }}>Date: {date}</p>
        <p style={{ fontSize: '0.8em', fontWeight: 'bold', margin: '5px 0' }}>Location: {location}</p>
      </div>
      {isSelected && (
        <>
          <button onClick={handleRSVP} style={{ marginTop: 'auto', backgroundColor: '#433D8B', color: '#C8ACD6', padding: '8px 12px', borderRadius: '5px' }}>RSVP</button>
          {showVideoButton && <button style={{ backgroundColor: '#433D8B', color: '#C8ACD6', padding: '8px 12px', borderRadius: '5px', marginTop: '10px' }}>Add Video</button>}
        </>
      )}
    </div>
  );
};
