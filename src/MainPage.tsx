import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from "./Event";
import './MainPage.css'; // Ensure CSS is correctly linked

const MainPage = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleEventClick = (eventTitle) => {
    setSelectedEvent(selectedEvent === eventTitle ? null : eventTitle);
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleSignOut = () => {
    navigate('/'); // Navigate back to sign-in page on sign out
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="main-page" style={{ fontFamily: 'Cambria' }}>
      <div className="header">
        <span className="site-name">Eventopia</span>
        <img src="https://lh3.googleusercontent.com/pw/AP1GczOrSEJuaCW5PbxnNvAxKacy8gv0vbvnYMqX6BzF-UiX87dLLY6ygJ-99925zlc5-lIxgUvvvyKM7nMHcPqg-p8dN-mnybBy_EvpL5x8lovp7Lt5AG0CP2V8FymRxBIQ-OVKBxJnDo2Jn_skojDDaRE=w400-h400-s-no-gm" alt="Logo" className="logo" />
        <div className="user-info">
          <div className="avatar">J</div>
          <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <h1 className="page-title">Upcoming Events</h1>
      <div className="event-grid">
        <Event 
          title="High Availability with Amazon Redshift"
          image="https://d2908q01vomqb2.cloudfront.net/7b52009b64fd0a2a49e6d8a939753077792b0554/2021/06/13/Amazon-FSx-for-Windows-File-Server-1.jpeg"
          date="2024-08-15 10:00 AM"
          location="USA"
          isSelected={selectedEvent === 'High Availability with Amazon Redshift'}
          onClick={() => handleEventClick('High Availability with Amazon Redshift')}
        />
        <Event 
          title="Managed Services with AWS Lambda"
          image="https://d2908q01vomqb2.cloudfront.net/7b52009b64fd0a2a49e6d8a939753077792b0554/2020/11/27/Site-Merch_AWS-Lambda-Code-Signing_Blog-1.png"
          date="2024-08-20 2:00 PM"
          location="Canada"
          isSelected={selectedEvent === 'Managed Services with AWS Lambda'}
          onClick={() => handleEventClick('Managed Services with AWS Lambda')}
        />
        <Event 
          title="Machine Learning with Amazon QuickSight"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzfm0b65imK0cC8i73MF1hgwTiomkiHXGOkT__VXYcaIj1tSLQ_ribwqakVeaoRzEcDs&usqp=CAU"
          date="2024-08-25 4:00 PM"
          location="UK"
          isSelected={selectedEvent === 'Machine Learning with Amazon QuickSight'}
          onClick={() => handleEventClick('Machine Learning with Amazon QuickSight')}
        />
      </div>

      <div className="chatbot-icon" onClick={toggleChat}>
        🤖
      </div>

      {isChatOpen && (
        <div className="chat-window">
          <header className="chat-header">Eventopia Assistant</header>
          <div className="message-area">
            {messages.map((message, index) => (
              <div key={index} className="message-bubble">{message}</div>
            ))}
          </div>
          <div className="input-area">
            <input
              className="message-input"
              placeholder="Type a message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="send-button" onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
