export interface Event {
    eventId: string;
    eventTitle: string;
    description: string;
    startTime: string;
    endTime: string;
  }
  const [events, setEvents] = useState<Event[]>([]);  