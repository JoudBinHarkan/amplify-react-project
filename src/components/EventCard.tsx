import React from 'react';

interface Event {
  EventID: string;
  EventTitle: string;
}

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  return (
    <div>
      <h3>{event.EventTitle}</h3>
      <button onClick={() => onRegister(event.EventID)}>Register</button>
    </div>
  );
};

export default EventCard;
