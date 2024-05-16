import Button from '@/components/Button';
import { setError, signUpFunc } from '@/store/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

const schema = z
  .object({
    name: z.string().min(6, 'Name must be at least 6 characters long'),
    email: z.string().email('Please provide a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*()_+{}\\[\]:;<>,.?/~]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormFields = z.infer<typeof schema>;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    dispatch(signUpFunc(data));
  };

  useEffect(() => {
    const errorMessages = Object.values(errors).map((e) => e.message);
    if (errorMessages.length) {
      dispatch(setError(errorMessages));
    }
  }, [errors]);

  return (
    <>
      <div className='flex min-h-full flex-col justify-center px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign up to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('name')}
              type='text'
              placeholder='Name'
              className='pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <input
              {...register('email')}
              type='text'
              placeholder='Email'
              className='pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <input
              {...register('password')}
              type='text'
              placeholder='Password'
              className='pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <input
              {...register('confirmPassword')}
              type='text'
              placeholder='Confirm Password'
              className='pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <p>
              <Button text='Submit' type='submit' />
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
