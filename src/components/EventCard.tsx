import React from 'react';
import registerUserForEvent from './RegisterUser'; // Ensure correct path

interface EventCardProps {
  event: {
    EventID: string;
    EventTitle: string;
    // Add other fields as needed
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const handleRegister = async () => {
    try {
      await registerUserForEvent(event.EventID);
      console.log(`Successfully registered for event ${event.EventID}`);
    } catch (error) {
      console.error(`Error registering for event ${event.EventID}:`, error);
    }
  };

  return (
    <div className="event-card">
      <h2>{event.EventTitle}</h2>
      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default EventCard;
