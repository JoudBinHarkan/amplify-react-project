import _React_, { useState } from "react";
import _Amplify_ from 'aws-amplify'; 
import * as _API_ from 'aws-amplify';
import post from 'aws-amplify/api';
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

  async function handleSendMessage() {
    if (currentMessage.trim() !== "") {
        setChatMessages(prevMessages => [...prevMessages, `You: ${currentMessage}`]);
        setCurrentMessage("");
        try {
            const apiResponse = await fetch(`https://5hio7pe5vb.execute-api.us-east-1.amazonaws.com/invoke_chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: currentMessage,
                    session_id: "unique-session-id",
                })
            });

            if (!apiResponse.ok) {
                throw new Error(`HTTP error! Status: ${apiResponse.status}`);
            }

            const responseData = await apiResponse.json();
            console.log('API Response Data:', responseData);  // Debugging line
            setChatMessages(prevMessages => [...prevMessages, `Bot: ${responseData.response || "No response"}`]);
        } catch (error) {
            console.error('Error sending message:', error);
            setChatMessages(prevMessages => [...prevMessages, 'Bot: Sorry, there was an error.']);
        }
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
        {/* Event Cards (existing code) */}
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
          <div className="chat-input-container">
        <input
          id="chat-input"
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? handleSendMessage() : null}
          placeholder="Type a message..."
          className="chat-input"
        />
       </div>
      </div>
      </div> )}
    </main>
          );
}

export default App; 