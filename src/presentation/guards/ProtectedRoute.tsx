import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../core/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Renders children only when the user has an active Supabase session.
 * While auth state is loading (initial rehydration), renders nothing to avoid
 * a flash redirect. Once resolved, unauthenticated users are sent to /login.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    // Avoid flash of /login during session rehydration
    return null;
  }

  if (!session) {
    return <Navigate replace to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
