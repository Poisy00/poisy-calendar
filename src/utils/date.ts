import { addHours, format } from 'date-fns';
import { Event, ParsedEvent } from '../types';
import { TIME_ZONE } from '../config/constants';

export function formatEventDateTime(date: Date, time: string): Date {
  return new Date(`${format(date, 'yyyy-MM-dd')}T${time}`);
}

export function convertToGoogleEvent(event: Event): ParsedEvent {
  const dateTime = formatEventDateTime(event.date, event.time);
  
  return {
    summary: event.title,
    start: {
      dateTime: dateTime.toISOString(),
      timeZone: TIME_ZONE,
    },
    end: {
      dateTime: addHours(dateTime, 1).toISOString(),
      timeZone: TIME_ZONE,
    },
    location: event.location,
  };
}
