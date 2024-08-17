import React, { useState } from 'react';
import { Event1, Event2, Event3 } from "./Event";
import './MainPage.css'; // Ensure this is imported correctly
import logo from './Logo.png'; // Ensure the path is correct

const MainPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleEventClick = (eventTitle) => {
    setSelectedEvent(selectedEvent === eventTitle ? null : eventTitle);
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="main-page">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="user-info">
          <div className="avatar">J</div>
          <button className="sign-out-button" onClick={() => console.log('Sign out')}>Sign Out</button>
        </div>
      </div>
      <h1>Upcoming Events</h1>
      <div className="event-grid">
        <Event1 isSelected={selectedEvent === 'High Availability with Amazon Redshift'} onClick={() => handleEventClick('High Availability with Amazon Redshift')} />
        <Event2 isSelected={selectedEvent === 'Managed Services with AWS Lambda'} onClick={() => handleEventClick('Managed Services with AWS Lambda')} />
        <Event3 isSelected={selectedEvent === 'Machine Learning with Amazon QuickSight'} onClick={() => handleEventClick('Machine Learning with Amazon QuickSight')} />
      </div>

      {selectedEvent && (
        <div className="event-details">
          <h2>{selectedEvent}</h2>
          <button onClick={() => alert('RSVP clicked!')}>RSVP</button>
          <button onClick={() => alert('Add video clicked!')}>Add Video</button>
        </div>
      )}

      <div className="chatbot-icon" onClick={toggleChat}>
        🤖
      </div>

      {isChatOpen && (
        <div className="chat-window">
          <div>Chat is active...</div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
