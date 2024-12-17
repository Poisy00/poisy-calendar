import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import EventInput from './components/EventInput';
import EventPreview from './components/EventPreview';
import { GOOGLE_CLIENT_ID } from './config/constants';
import { useAuth } from './hooks/useAuth';
import { useEventManagement } from './hooks/useEventManagement';

function App() {
  const { isLoggedIn, userEmail, handleLogin, handleLogout } = useAuth();
  const {
    isProcessing,
    parsedEvent,
    handleEventSubmit,
    handleEventConfirm,
    clearEvent,
  } = useEventManagement();

  return (
    <GoogleOAuthProvider 
      clientId={GOOGLE_CLIENT_ID}
    >
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Header
          onLogin={handleLogin}
          onLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Create Calendar Events Naturally
              </h2>
              <p className="text-gray-600">
                Just type your event in plain English, and we'll handle the rest.
              </p>
            </div>

            {isLoggedIn ? (
              <>
                <EventInput
                  onSubmit={handleEventSubmit}
                  isProcessing={isProcessing}
                />

                {parsedEvent && (
                  <div className="flex justify-center">
                    <EventPreview
                      event={parsedEvent}
                      onConfirm={handleEventConfirm}
                      onCancel={clearEvent}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Please sign in to create events</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;