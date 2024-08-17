import React from 'react';

const eventStyle = {
  padding: '20px',
  backgroundColor: '#2E236C', // Updated to use your theme color
  borderRadius: '8px',
  maxWidth: '200px',
  cursor: 'pointer',
  margin: '10px', // Ensure spacing between the events
  color: '#C8ACD6', // Text color from your theme
};

const detailedStyle = {
  ...eventStyle,
  maxWidth: '400px',
  padding: '30px',
};

export const Event1 = ({ onClick, isSelected }: { onClick: () => void, isSelected: boolean }) => (
  <div onClick={onClick} style={isSelected ? detailedStyle : eventStyle}>
    <h2>High Availability with Amazon Redshift</h2>
    <img src="https://d2908q01vomqb2.cloudfront.net/7b52009b64fd0a2a49e6d8a939753077792b0554/2021/06/13/Amazon-FSx-for-Windows-File-Server-1.jpeg" alt="Event 1" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
    <p>Date: 2024-08-15 10:00 AM</p>
    <p>Location: USA</p>
    {isSelected && <>
      <button style={{ margin: '10px', backgroundColor: '#433D8B', color: '#C8ACD6' }}>RSVP</button>
      <button style={{ margin: '10px', backgroundColor: '#433D8B', color: '#C8ACD6' }}>Add Video</button>
    </>}
  </div>
);

export const Event2 = ({ onClick, isSelected }: { onClick: () => void, isSelected: boolean }) => (
  <div onClick={onClick} style={isSelected ? detailedStyle : eventStyle}>
    <h2>Managed Services with AWS Lambda</h2>
    <img src="https://d2908q01vomqb2.cloudfront.net/7b52009b64fd0a2a49e6d8a939753077792b0554/2020/11/27/Site-Merch_AWS-Lambda-Code-Signing_Blog-1.png" alt="Event 2" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
    <p>Date: 2024-08-20 2:00 PM</p>
    <p>Location: Canada</p>
    {isSelected && <>
      <button style={{ margin: '10px', backgroundColor: '#433D8B', color: '#C8ACD6' }}>RSVP</button>
      <button style={{ margin: '10px', backgroundColor: '#433D8B', color: '#C8ACD6' }}>Add Video</button>
    </>}
  </div>
);

export const Event3 = ({ onClick, isSelected }: { onClick: () => void, isSelected: boolean }) => (
  <div onClick={onClick} style={isSelected ? detailedStyle : eventStyle}>
    <h2>Machine Learning with Amazon QuickSight</h2>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzfm0b65imK0cC8i73MF1hgwTiomkiHXGOkT__VXYcaIj1tSLQ_ribwqakVeaoRzEcDs&usqp=CAU" alt="Event 3" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
    <p>Date: 2024-08-25 4:00 PM</p>
    <p>Location: UK</p>
    {isSelected && <>
      <button style={{ margin: '10px', backgroundColor: '#433D8B', color: '#C8ACD6' }}>RSVP</button>
      <button style={{ margin: '10px', backgroundColor: '#433D8B', color: '#C8ACD6' }}>Add Video</button>
    </>}
  </div>
);
