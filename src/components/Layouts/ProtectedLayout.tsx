import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';

const ProtectedLayout = () => {
  const hasToken = localStorage.getItem('hasToken');
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!hasToken) {
      navigate('/auth/sign-in');
    } else {
      setDisplay(true);
    }
  }, [hasToken, navigate]);

  return (
    <div>
      {display && (
        <div>
          <div>
            <Navigation />
          </div>
          <div className='text-center'>
            <div className='w-1/2 p-2'>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProtectedLayout;
