import React, { useEffect, useState } from 'react';
import fetchAllEvents from '../App'; // Make sure the path is correct
import EventCard from './EventCard'; // Ensure this path is correct
import registerUserForEvent from './RegisterUser'; // Correct path here

interface Event {
    EventID: string;
    EventTitle: string;
    // Add other fields as necessary
  }

  const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

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
      return (
        <div>
          <h1>Events</h1>
          <div>
            <p>Event length: {events.length}</p> {/* Display the length of events */}
            {events.map((event, index) => (
              <div key={index}>
                <h2>{event.EventTitle}</h2>
                <p>ID: {event.EventID}</p>
              </div>
            ))}
          </div>
        </div>
      );
  } 
  export default EventsPage;