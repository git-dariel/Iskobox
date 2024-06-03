import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { registerUser } from '@/services/users/user.service';
import { Toaster, toast } from 'sonner';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Image from '../../assets/shareehub.png';

const SignUp = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !password || !role) {
      return toast.warning('Required all fields');
    }

    if (!validator.isEmail(email)) {
      return toast.warning('Email is invalid');
    }

    try {
      const registrationSuccessful = await registerUser(email, password, firstname, lastname, role);
      if (registrationSuccessful) {
        toast.success('Account has been created');
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setRole('');
      } else {
        return toast.warning('Registration failed');
      }
    } catch (error) {
      console.error(error);
      return toast.warning('Registration failed');
    }
  };

  return (
    <div className='bg-[#F0F4F9] h-screen flex justify-center items-center'>
      <Toaster />
      <div className=' bg-[#FFFFFF] w-4/5 h-4/5 md:w-9/12 md:h-[26rem] rounded-3xl md:flex md:justify-between md:mb-14'>
        <div className='px-8 pt-5'>
          <img src={Image} alt='logo' className='w-20 h-20 md:w-28 md:h-auto' />
          <h1 className='text-2xl md:text-3xl md:pb-5 md:pt-0 pb-3 pt-0'>
            Create a Iskobox Account
          </h1>
          <h1 className='text-sm md:text-base '>Enter your Information</h1>
        </div>

        <div className='flex-col flex items-center pt-5 md:pt-8 md:pr-8'>
          <Input
            className='md:w-my-width w-72 mb-5 md:py-6'
            placeholder='First Name'
            name='firstname'
            type='text'
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <Input
            className='md:w-my-width w-72 mb-5 md:py-6'
            placeholder='Last Name'
            name='lastname'
            type='text'
            onChange={(e) => setLastname(e.target.value)}
            required
          />
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

          <div className='flex flex-row justify-between'>
            <div className='border border-slate-300 rounded-full py-2 px-1 md:w-40 flex items-center mr-2'>
              <input
                type='radio'
                name='role'
                value='Admin'
                onChange={(e) => setRole(e.target.value)}
                className='form-radio h-5 w-5 cursor-pointer ml-2'
              />
              <label className='inline-flex items-center cursor-pointer flex-grow justify-center'>
                <span className='text-gray-700 font-medium'>Admin</span>
              </label>
            </div>

            <div className='border border-slate-300 rounded-full py-2 px-1 md:w-40 flex items-center'>
              <input
                type='radio'
                name='role'
                value='Faculty'
                onChange={(e) => setRole(e.target.value)}
                className='form-radio h-5 w-5 cursor-pointer ml-2'
              />
              <label className='inline-flex items-center cursor-pointer flex-grow justify-center'>
                <span className='text-gray-700 font-medium'>Faculty</span>
              </label>
            </div>
          </div>

          <div className='md:flex md:items-end md:justify-end md:w-full'>
            <button
              onClick={handleSubmit}
              className='bg-[#0B57D0] text-white text-[12px] px-4 py-2 md:px-5 md:py-3 rounded-3xl hover:bg-blue-900 md:text-sm transition-all duration-300 cursor-pointer'
            >
              Submit
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
          <Link to='/'>
            <h1 className='md:text-sm hover:px-2 hover:py-2 text-sm hover:bg-slate-200 rounded-md hover:md:px-4 hover:rounded-lg md:p-2 transition-all duration-300 cursor-pointer mx-2'>
              Sign in
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
