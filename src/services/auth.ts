import { googleLogout } from '@react-oauth/google';

export const logout = () => {
  googleLogout();
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('google_token');
};