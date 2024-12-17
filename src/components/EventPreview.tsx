import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Event } from '../types';
import { format } from 'date-fns';

interface EventPreviewProps {
  event: Event;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EventPreview({ event, onConfirm, onCancel }: EventPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar size={20} />
          <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-600">
          <Clock size={20} />
          <span>{event.time}</span>
        </div>
        
        {event.location && (
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin size={20} />
            <span>{event.location}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add to Calendar
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}