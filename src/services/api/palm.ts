import axios from 'axios';
import { PALM_API_KEY, PALM_API_BASE_URL } from '../../config/constants';
import { PalmResponse } from '../../types/api';

export async function generateEventFromText(text: string) {
  try {
    const response = await axios.post<PalmResponse>(
      `${PALM_API_BASE_URL}?key=${PALM_API_KEY}`,
      {
        prompt: `Extract event details from the following text: "${text}". Return a JSON object with title, date, time, and location (if present).`,
        temperature: 0.7,
        candidateCount: 1,
      }
    );

    return response.data.candidates[0].output;
  } catch (error) {
    console.error('Error calling PaLM API:', error);
    throw error;
  }
}