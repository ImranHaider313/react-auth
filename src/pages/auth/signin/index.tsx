import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AutLoginData, signInFunc } from '@/store/authSlice';
import { useAppDispatch } from '@/store';
import Textbox from '@/components/Textbox';

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<AutLoginData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = () => {
    dispatch(signInFunc(userData));
  };
  return (
    <>
      <div className='flex min-h-full flex-col justify-center px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign up to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' action='#' method='POST'>
            <Textbox
              handleChange={handleChange}
              name='email'
              type='email'
              id='email'
              label='Email address'
              value={userData.email}
            />

            <Textbox
              handleChange={handleChange}
              name='password'
              type='password'
              id='password'
              label='Password'
              value={userData.password}
            />

            <div>
              <button
                type='button'
                onClick={handleSignIn}
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Login
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Create account?{' '}
            <Link
              to='/auth/sign-up'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
