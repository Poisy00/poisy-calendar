export interface Event {
  title: string;
  date: Date;
  time: string;
  location?: string;
}

export interface ParsedEvent {
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: string;
}
