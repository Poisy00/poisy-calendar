import { useState } from 'react';
import { Event, ParsedEvent } from '../types';
import { parseEventText, convertToGoogleEvent } from '../services/eventParser';
import { addEventToCalendar } from '../services/calendar';
import toast from 'react-hot-toast';

export function useEventManagement() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedEvent, setParsedEvent] = useState<Event | null>(null);

  const handleEventSubmit = async (text: string) => {
    setIsProcessing(true);
    try {
      const event = await parseEventText(text);
      setParsedEvent(event);
      toast.success('Event successfully parsed!');
    } catch (error) {
      console.error('Error parsing event:', error);
      toast.error('Failed to parse event. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEventConfirm = async () => {
    if (!parsedEvent) return;

    try {
      const token = localStorage.getItem('google_token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const googleEvent = convertToGoogleEvent(parsedEvent);
      await addEventToCalendar(googleEvent, token);
      toast.success('Event added to calendar!');
      setParsedEvent(null);
    } catch (error) {
      console.error('Error adding event to calendar:', error);
      toast.error('Failed to add event to calendar. Please try again.');
    }
  };

  return {
    isProcessing,
    parsedEvent,
    handleEventSubmit,
    handleEventConfirm,
    clearEvent: () => setParsedEvent(null),
  };
}