import axios from 'axios';
import { PALM_API_KEY } from '../config/constants';
import { Event, ParsedEvent } from '../types';
import { addHours, format } from 'date-fns';

const PALM_API_URL = 'https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText';

interface PalmResponse {
  candidates: Array<{
    output: string;
  }>;
}

export async function parseEventText(text: string): Promise<Event> {
  try {
    const response = await axios.post<PalmResponse>(
      `${PALM_API_URL}?key=${PALM_API_KEY}`,
      {
        prompt: `Extract event details from the following text: "${text}". Return a JSON object with title, date, time, and location (if present).`,
        temperature: 0.7,
        candidateCount: 1,
      }
    );

    const parsedOutput = JSON.parse(response.data.candidates[0].output);
    return {
      title: parsedOutput.title,
      date: new Date(parsedOutput.date),
      time: parsedOutput.time,
      location: parsedOutput.location,
    };
  } catch (error) {
    console.error('Error parsing event text:', error);
    throw error;
  }
}

export function convertToGoogleEvent(event: Event): ParsedEvent {
  const dateTime = new Date(`${format(event.date, 'yyyy-MM-dd')}T${event.time}`);
  
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