import axios from 'axios';
import { ParsedEvent } from '../../types';
import { CALENDAR_API_BASE_URL, TIME_ZONE } from '../../config/constants';

export async function addEventToCalendar(event: ParsedEvent, token: string) {
  try {
    const response = await axios.post(
      `${CALENDAR_API_BASE_URL}/calendars/primary/events`,
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
