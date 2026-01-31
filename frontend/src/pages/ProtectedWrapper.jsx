import { useEffect } from 'react';
import { useUser } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';

const ProtectedWrapper = ({ children }) => {
  const { isLoggedIn, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/auth', { replace: true });
    }
  }, [loading, isLoggedIn, navigate]);

  if (loading) return null;

  return (
    <div className="protected-wrapper min-h-screen bg-zinc-900">
      {children}
    </div>
  );
};

export default ProtectedWrapper;
