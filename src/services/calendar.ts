import axios from 'axios';
import { ParsedEvent } from '../types';
import { TIME_ZONE } from '../config/constants';

const CALENDAR_API_URL = 'https://www.googleapis.com/calendar/v3';

export async function addEventToCalendar(event: ParsedEvent, token: string) {
  try {
    const response = await axios.post(
      `${CALENDAR_API_URL}/calendars/primary/events`,
      {
        ...event,
        timeZone: TIME_ZONE,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding event to calendar:', error);
    throw error;
  }
}
