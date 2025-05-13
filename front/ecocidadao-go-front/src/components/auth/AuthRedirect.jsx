// src/components/auth/AuthRedirect.jsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function AuthRedirect({ user }) {
  const history = useHistory();
  useEffect(() => {
    if (user) history.replace('/dashboard');
  }, [user, history]);
  return null;
}
