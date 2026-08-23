import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (user.role === 'recruiter' && user.recruiterStatus === 'pending') {
    return (
      <div className="p-8 text-center text-amber-600 font-semibold border border-amber-200 bg-amber-50 rounded-lg m-6">
        Your Recruiter account is currently awaiting Admin approval.
      </div>
    );
  }

  return <Outlet />;
}