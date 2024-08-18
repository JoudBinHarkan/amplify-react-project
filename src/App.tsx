import React, { useEffect, useState } from "react";
import { Amplify } from 'aws-amplify';
import * as _API_ from 'aws-amplify';
import _graphqlOperation_ from 'aws-amplify';
import {post} from 'aws-amplify/api';
import _Storage_ from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import {fromCognitoIdentityPool} from "@aws-sdk/credential-providers";
import "./App.css";
import AWS from 'aws-sdk';
import awsconfig from './amplifyconfiguration.json';
import styles from './index.css';
import EventCard from './components/EventCard'; 

AWS.config.update({
  region: awsconfig.aws_project_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsconfig.aws_cognito_identity_pool_id,
  }),
}) 
import { Container, Grid, Card, CardContent, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = new AWS.DynamoDB.DocumentClient();
import { GetCommand } from "@aws-sdk/lib-dynamodb";
const categories = [
  { name: 'Workshops', filter: 'workshop' },
  { name: 'Conferences', filter: 'conference' },
  { name: 'Meetups', filter: 'meetup' },
  // Add more categories as needed
];

function App() {
  const [events, setEvents] = useState<any[]>([]);
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
async function fetchAllEvents() {
  try {
    const params = {
      TableName: 'EventsData',
    };

    const result = await docClient.scan(params).promise();

    if (result.Items) {
      return result.Items;
    } else {
      console.error('No items found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

useEffect(() => {
  async function loadEvents() {
    try {
      const fetchedEvents = await fetchAllEvents();

      // Check if fetchedEvents is an array of Event objects
      if (Array.isArray(fetchedEvents)) {
        setEvents(fetchedEvents);
      } else {
        console.error('Fetched events are not in the correct format');
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }
  loadEvents();
}, []); 


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
      <div className="events-page">
      <h1>Events</h1>
      <div className="event-cards-container">
        {events.map((event) => (
          <EventCard key={event.EventID} event={event} />
        ))}
      </div>
    </div>
      

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

        </div>
      )}
    </main>
  );
}

export default App;
