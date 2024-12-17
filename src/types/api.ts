export interface PalmResponse {
  candidates: Array<{
    output: string;
  }>;
}

export interface GoogleCalendarResponse {
  id: string;
  status: string;
  htmlLink: string;
}