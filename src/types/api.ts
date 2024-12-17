export interface PalmResponse {
  candidates: {
    output: string;
  }[];
}

export interface GoogleCalendarResponse {
  id: string;
  status: string;
  htmlLink: string;
}
