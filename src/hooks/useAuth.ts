import { useState, useCallback, useEffect } from 'react';
import { CredentialResponse } from '@react-oauth/google';
import { logout } from '../services/auth';
import toast from 'react-hot-toast';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('google_token');
    if (token) {
      setIsLoggedIn(true);
      const email = localStorage.getItem('user_email');
      if (email) setUserEmail(email);
    }
  }, []);

  const handleLogin = useCallback(async (response: CredentialResponse) => {
    try {
      if (response.credential) {
        localStorage.setItem('google_token', response.credential);
        setIsLoggedIn(true);
        
        // Decode JWT to get email
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        setUserEmail(payload.email);
        localStorage.setItem('user_email', payload.email);
        
        toast.success('Successfully logged in!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to log in. Please try again.');
    }
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    localStorage.removeItem('google_token');
    localStorage.removeItem('user_email');
    setIsLoggedIn(false);
    setUserEmail(undefined);
    toast.success('Successfully logged out!');
  }, []);

  return {
    isLoggedIn,
    userEmail,
    handleLogin,
    handleLogout,
  };
}
