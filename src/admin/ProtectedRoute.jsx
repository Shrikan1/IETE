import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Still loading auth state
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#15173D]">
        <div className="w-10 h-10 border-4 border-[#982598] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
