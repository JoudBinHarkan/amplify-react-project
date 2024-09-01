import React, { useEffect, useState } from "react";
import { Amplify } from 'aws-amplify';
import * as _API_ from 'aws-amplify';
import _graphqlOperation_ from 'aws-amplify';
import { post } from 'aws-amplify/api';
import '@aws-amplify/ui-react/styles.css';
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import "./App.css";
import AWS from 'aws-sdk';
import awsconfig from './amplifyconfiguration.json';
import _Storage_ from '@aws-amplify/storage';

export interface Event {
  eventId: string;
  eventTitle: string;
  description: string;
  startTime: string;
  endTime: string;
}

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsconfig.aws_cognito_identity_pool_id,
  }),
});

import { Container, Grid, Card, CardContent, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
const client = new DynamoDBClient({});
const docClient = new AWS.DynamoDB.DocumentClient();
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const categories = ['All', 'Workshops', 'Webinars', 'Conferences', 'Meetups'];

const placeholderImage = 'https://blog.adobe.com/en/publish/2021/08/31/media_1649ebc3fbbce0df508081913819d491fc3f7c7a9.png?width=2000&format=webply&optimize=medium';
const fallbackImage = 'https://via.placeholder.com/300x200.png?text=Image+Unavailable'; // Example fallback image

function App() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    console.log('Signing out...');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

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
        console.log('API Response Data:', responseData);
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
        // Assign the provided image URL to all events
        const updatedEvents = result.Items.map((event: any) => ({
          ...event,
          Category: event.Category || categories[Math.floor(Math.random() * categories.length)],
          EventImage: placeholderImage // Use the provided image URL
        }));
        setEvents(updatedEvents);
        return result.Items;
      } else {
        console.error('No items found');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(event => event.Category === selectedCategory);

  const handleEventClick = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    console.log("View Profile clicked");
  };

  useEffect(() => {
    async function loadEvents() {
      try {
        const fetchedEvents = await fetchAllEvents();

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

  const handleRegister = (eventId: string) => {
    console.log('Registering for event with EventID:', eventId);
  };

  // Common styles
  const commonStyles = {
    fontFamily: 'Times New Roman, serif',
    color: '#ffa500'
  };

  return (
    <div className="main-page" style={{ fontFamily: 'Cambria, serif', padding: '20px', minHeight: '100vh', backgroundColor: '#646cff', color: '#f2e7fe', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Section */}
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
        
        <button 
          onClick={handleSignOut} 
          style={{ backgroundColor: '#f2e7fe', color: '#3f3cbb', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Sign Out
        </button>
  
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczOrSEJuaCW5PbxnNvAxKacy8gv0vbvnYMqX6BzF-UiX87dLLY6ygJ-99925zlc5-lIxgUvvvyKM7nMHcPqg-p8dN-mnybBy_EvpL5x8lovp7Lt5AG0CP2V8FymRxBIQ-OVKBxJnDo2Jn_skojDDaRE=w400-h400-s-no-gm"  // Correct logo path
          alt="Eventopia Logo"
          style={{ width: '200px', height: 'auto', marginRight: '20px' }}
        />
  
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <div
            onClick={handleAvatarClick}
            style={{ backgroundColor: '#f2e7fe', color: '#3f3cbb', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            J
          </div>
          {isDropdownOpen && (
            <div style={{ position: 'absolute', right: 0, backgroundColor: '#f2e7fe', color: '#3f3cbb', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 1 }}>
              <div 
                onClick={handleProfileClick}
                style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #3f3cbb' }}
              >
                View Profile
              </div>
              <div 
               
              >
                Upload Recording
              </div>
            </div>
          )}
        </div>
  
      </div>
  
      {/* Categories */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', gap: '15px' }}>
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => handleCategoryClick(category)}
            style={{
              backgroundColor: selectedCategory === category ? '#f2e7fe' : '#3f3cbb',
              color: selectedCategory === category ? '#3f3cbb' : '#f2e7fe',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {category}
          </button>
        ))}
      </div>
  
      {/* Page Title */}
      <h1 style={{ color: '#f2e7fe', textAlign: 'center', margin: '40px 0' }}>Upcoming Events</h1>
  
      {/* Event Grid */}
      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '20px 0' }}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.EventID}
              onClick={() => handleEventClick(event.EventTitle)}
              style={{
                cursor: 'pointer',
                border: selectedEvent === event.EventTitle ? '2px solid #f2e7fe' : '1px solid #ccc',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#f2e7fe',
                color: '#3f3cbb',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                width: '300px',
                flexShrink: 0,
              }}
            >
              <img 
                src="https://www.lytics.com/wp-content/uploads/2022/03/article-Why-use-machine-learning-and-AI-for-personalization-and-marketing-relevance_.jpg"
                alt={event.EventTitle} 
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = fallbackImage; }} 
              />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '10px 0', fontSize: '18px', color: '#3f3cbb' }}>{event.EventTitle}</h3>
                <p style={{ margin: '5px 0', color: '#555' }}>{event.EventDate}</p>
                <p style={{ margin: '5px 0', color: '#555' }}>{event.EventLocation}</p>
                <button 
                  onClick={() => console.log(`Register for ${event.EventTitle}`)} 
                  style={{ backgroundColor: '#3f3cbb', color: '#f2e7fe', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px', width: '100%' }}
                >
                  Register
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#f2e7fe', textAlign: 'center', fontSize: '18px' }}>No events available</p>
        )}
      </div>
  
      {/* Chatbot Icon */}
      <div 
        onClick={toggleChat} 
        style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#3f3cbb', color: '#f2e7fe', borderRadius: '50%', padding: '15px', cursor: 'pointer', fontSize: '24px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      >
        🤖
      </div>
  
      {/* Chat Window */}
      {isChatOpen && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', width: '300px', height: '400px', backgroundColor: '#f2e7fe', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#3f3cbb', color: '#f2e7fe', padding: '10px', borderRadius: '10px 10px 0 0', textAlign: 'center', fontWeight: 'bold' }}>
            Eventopia Assistant
          </div>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px', padding: '10px' }}>
            {chatMessages.map((message, index) => (
              <div key={index} style={{ textAlign: 'left', margin: '5px 0' }}>
                <span style={{ backgroundColor: '#3f3cbb', color: '#f2e7fe', padding: '5px 10px', borderRadius: '15px' }}>{message}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            <input
              placeholder="Type a message..."
              value={currentMessage}
              onChange={e => setCurrentMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #3f3cbb', marginRight: '10px' }}
            />
            <button 
              onClick={handleSendMessage} 
              style={{ backgroundColor: '#3f3cbb', color: '#f2e7fe', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold' }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 
