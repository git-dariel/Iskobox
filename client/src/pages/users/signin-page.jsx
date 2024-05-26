import { useAuth } from '@/helpers/auth.context';
import { loginUser } from '@/services/users/user-service';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import validator from 'validator';
import Image from '../../assets/shareehub.png';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      return toast.warning('Required all fields');
    }

    if (!validator.isEmail(email)) {
      return toast.warning('Email is invalid');
    }

    try {
      await loginUser(email, password);
      toast.success('Login successful');
    } catch (error) {
      return toast.warning('Login failed');
    }
  };

  return (
    <div className='bg-[#F0F4F9] h-screen flex justify-center items-center'>
      <Toaster />
      <div className=' bg-[#FFFFFF] w-4/5 h-4/5 md:w-9/12 md:h-96 rounded-3xl md:flex md:justify-between md:mb-14'>
        <div className='px-8 pt-5 md:px-20 md:pt-10'>
          <img src={Image} alt='logo' className='w-20 h-20 md:w-28 md:h-auto' />
          <h1 className='text-2xl md:text-3xl md:pb-5 md:pt-0 pb-3 pt-0'>Sign in</h1>
          <h1 className='text-sm md:text-base '>Use your Iskobox Account</h1>
        </div>

        <div className='flex-col flex items-center pt-5 md:pt-32 md:pr-8'>
          <Input
            className='md:w-my-width w-72 mb-5 md:py-6'
            placeholder='Email'
            type='email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            className='md:w-my-width w-72 mb-5 md:py-6'
            placeholder='Password'
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className='md:flex md:items-end md:justify-end md:w-full'>
            <button
              onClick={handleSignIn}
              className='bg-[#0B57D0] text-white text-[12px] px-4 py-2 md:px-4 md:py-2 rounded-3xl hover:bg-blue-900 md:text-sm md:mt-3 transition-all duration-300 cursor-pointer'
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className='fixed bottom-7 md:bottom-36 md:ml-my-margin text-right'>
        <div className='flex flex-row'>
          <h1 className='md:text-sm hover:px-2 hover:py-2 text-sm hover:bg-slate-200 rounded-md hover:md:px-4 hover:rounded-lg md:p-2 transition-all duration-300 cursor-pointer mx-2'>
            Help
          </h1>
          <h1 className='md:text-sm hover:px-2 hover:py-2 text-sm hover:bg-slate-200 rounded-md hover:md:px-4 hover:rounded-lg md:p-2 transition-all duration-300 cursor-pointer mx-2'>
            Terms
          </h1>
          <Link to='/signup'>
            <h1 className='md:text-sm hover:px-2 hover:py-2 text-sm hover:bg-slate-200 rounded-md hover:md:px-4 hover:rounded-lg md:p-2 transition-all duration-300 cursor-pointer mx-2'>
              Sign up
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
