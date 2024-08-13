import React, { useState } from "react";
import '@aws-amplify/ui-react/styles.css';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  function handleSignIn() {
    setIsSignedIn(true);
  }

  function handleSignOut() {
    setIsSignedIn(false);
  }

  function handleChatToggle() {
    setIsChatOpen(!isChatOpen);
  }

  function handleSendMessage() {
    if (currentMessage.trim() !== "") {
      setChatMessages([...chatMessages, currentMessage]);
      setCurrentMessage("");
      // Here, you would also send the message to your chatbot service and handle the response
    }
  }

  // Common styles
  const commonStyles = {
    fontFamily: 'Times New Roman, serif',
    color: '#ffa500'
  };

  if (!isSignedIn) {
    return (
      <div style={{ ...commonStyles, textAlign: 'center', padding: '20px' }}>
        <h1>Welcome to Your Events Guide</h1>
        <button onClick={handleSignIn} style={{
          ...commonStyles,
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#1e3a8a',
          color: '#ffa500',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>Sign In</button>
      </div>
    );
  }

  return (
    <main style={{ ...commonStyles, padding: '20px', textAlign: 'center' }}>
      {/* Sign Out Button */}
      <button onClick={handleSignOut} style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        ...commonStyles,
        backgroundColor: '#1e3a8a',
        color: '#ffa500',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
      }}>
        Sign Out
      </button>

      {/* User Avatar */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '40px',
        height: '40px',
        backgroundColor: '#1e3a8a',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ffa500',
        fontSize: '18px',
        ...commonStyles
      }}>
        J
      </div>

      <h1 style={{ fontSize: '3em', marginBottom: '40px' }}>Upcoming Events</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
        <div style={{ width: '30%', padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <img src="https://d2908q01vomqb2.cloudfront.net/7b52009b64fd0a2a49e6d8a939753077792b0554/2021/06/13/Amazon-FSx-for-Windows-File-Server-1.jpeg" alt="Event 1" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
          <h2>High Availability with Amazon Redshift</h2>
          <p>Learn how to achieve high availability with Amazon Redshift in this informative session.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm4-2v1h6V2H5z"/>
              </svg>
              <span style={{ marginLeft: '5px' }}>2024-08-15 10:00 AM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M8 0a4 4 0 0 1 4 4c0 3.5-4 8-4 8S4 7.5 4 4a4 4 0 0 1 4-4zm0 1.5a2.5 2.5 0 0 0-2.5 2.5c0 2 2.5 5.5 2.5 5.5s2.5-3.5 2.5-5.5A2.5 2.5 0 0 0 8 1.5zM8 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
              <span style={{ marginLeft: '5px' }}>USA</span>
            </div>
          </div>
        </div>
        <div style={{ width: '30%', padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <img src="https://d2908q01vomqb2.cloudfront.net/7b52009b64fd0a2a49e6d8a939753077792b0554/2020/11/27/Site-Merch_AWS-Lambda-Code-Signing_Blog-1.png" alt="Event 2" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
          <h2>Managed Services with AWS Lambda</h2>
          <p>Discover how to manage services effectively using AWS Lambda in this comprehensive workshop.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm4-2v1h6V2H5z"/>
              </svg>
              <span style={{ marginLeft: '5px' }}>2024-08-20 2:00 PM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M8 0a4 4 0 0 1 4 4c0 3.5-4 8-4 8S4 7.5 4 4a4 4 0 0 1 4-4zm0 1.5a2.5 2.5 0 0 0-2.5 2.5c0 2 2.5 5.5 2.5 5.5s2.5-3.5 2.5-5.5A2.5 2.5 0 0 0 8 1.5zM8 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
              <span style={{ marginLeft: '5px' }}>Canada</span>
            </div>
          </div>
        </div>
        <div style={{ width: '30%', padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZzfm0b65imK0cC8i73MF1hgwTiomkiHXGOkT__VXYcaIj1tSLQ_ribwqakVeaoRzEcDs&usqp=CAU" alt="Event 3" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
          <h2>Machine Learning with Amazon QuickSight</h2>
          <p>Explore the possibilities of machine learning with Amazon QuickSight in this engaging session.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm4-2v1h6V2H5z"/>
              </svg>
              <span style={{ marginLeft: '5px' }}>2024-08-25 4:00 PM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M8 0a4 4 0 0 1 4 4c0 3.5-4 8-4 8S4 7.5 4 4a4 4 0 0 1 4-4zm0 1.5a2.5 2.5 0 0 0-2.5 2.5c0 2 2.5 5.5 2.5 5.5s2.5-3.5 2.5-5.5A2.5 2.5 0 0 0 8 1.5zM8 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
              <span style={{ marginLeft: '5px' }}>UK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Button */}
      <button onClick={handleChatToggle} style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 15px',
        fontSize: '16px',
        borderRadius: '50%',
        backgroundColor: '#1e3a8a',
        color: '#ffa500',
        border: 'none',
        cursor: 'pointer',
        ...commonStyles
      }}>
        🤖
      </button>

      {/* Video Upload Button */}
      <button style={{
        position: 'fixed',
        bottom: '90px',
        right: '20px',
        padding: '10px 15px',
        fontSize: '16px',
        borderRadius: '50%',
        backgroundColor: '#1e3a8a',
        color: '#ffa500',
        border: 'none',
        cursor: 'pointer',
        ...commonStyles
      }}>
        🎥
      </button>

      {/* Chat Window */}
      {isChatOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '300px',
          height: '400px',
          backgroundColor: '#1e3a8a',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          ...commonStyles
        }}>
          {/* Chatbot Name */}
          <div style={{
            backgroundColor: '#1e3a8a',
            color: '#ffa500',
            padding: '10px',
            borderRadius: '10px 10px 0 0',
            textAlign: 'center',
            fontWeight: 'bold',
            ...commonStyles
          }}>
            Events Assistant
          </div>

          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px', padding: '10px' }}>
            {chatMessages.map((message, index) => (
              <div key={index} style={{ textAlign: 'left', margin: '5px 0' }}>
                <span style={{ backgroundColor: '#1e3a8a', color: '#ffa500', padding: '5px 10px', borderRadius: '15px' }}>{message}</span>
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
              placeholder="Type a message..."
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', ...commonStyles }}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;

