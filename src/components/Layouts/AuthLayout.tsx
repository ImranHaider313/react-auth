import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Alert from '@/components/Alert/error';
import React, { useEffect } from 'react';
import { clearError } from '@/store/authSlice';
import { RootState, useAppSelector } from '@/store/index';

const AuthLayout: React.FC = () => {
  const state = useAppSelector<RootState>((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (state.errors.length) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 500000);

      return () => clearTimeout(timer);
    }
  }, [state.errors, dispatch]);

  const hasToken = localStorage.getItem('hasToken');

  useEffect(() => {
    if (hasToken) {
      return navigate('/');
    }
  }, [hasToken, navigate]);

  return (
    <div className='flex flex-col'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm mt-4'>
        {state.errors.map((error: string, index: number) => (
          <Alert key={`testId-${index}`} text={error} />
        ))}
      </div>

      <div className=''>{<Outlet />}</div>
    </div>
  );
};

export default AuthLayout;
