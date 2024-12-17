import React from 'react';
import { Calendar } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';

interface HeaderProps {
  onLogin: (response: CredentialResponse) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  userEmail?: string;
}

export default function Header({ onLogin, onLogout, isLoggedIn, userEmail }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar size={28} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Poisy</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <GoogleLogin
                onSuccess={onLogin}
                onError={() => console.error('Login Failed')}
                useOneTap
                auto_select
                ux_mode="popup"
              />
            ) : (
              <>
                <span className="text-gray-600">{userEmail}</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}