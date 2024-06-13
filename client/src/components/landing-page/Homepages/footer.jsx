import React from 'react';
import { HomeData } from '@/configs/LanfingPageConfigs/homepage.data';
import { IoIosGlobe } from 'react-icons/io';
import { FaFacebookF } from 'react-icons/fa6';
import { SiGooglemaps } from 'react-icons/si';

export default function Footer() {
  return (
    <div
      className='border text-center w-full select-none bg-cover bg-no-repeat bg-center shadow-xl'
      style={{ backgroundImage: `url(${HomeData.BgImg})` }}
    >
      <div className='flex lg:flex-row justify-center w-full'>
        <div className='bg-[#810101] w-[80%] bg-opacity-50 text-left flex flex-row justify-start items-center px-10'>
          <div className='w-[60px] h-[60px] md:w-[60px] md:h-[60px] sm:w-[60px] sm:h-[60px]'>
            <img src={HomeData.puplogo} alt='' />
          </div>
          <h3 className='text-[#ffffff] text-sm font-regular sm:text-sm md:text-lg lg:text-2xl px-10 py-5 flex flex-col '>
            <span>{HomeData.pupname}</span>
            <span>{HomeData.credit}</span>
          </h3>
        </div>

        <div className='text-[#ffffff] gap-2 w-[50%] md:w-[30%]  lg:w-[20%] flex flex-col justify-center items-center bg-[#810101] bg-opacity-50 '>
          <div className='flex justify-center items-center gap-2  '>
            <a href={HomeData.weblink} className='rounded-md border px-2 py-2 hover:bg-[#810101]'>
              <IoIosGlobe />
            </a>
            <a href={HomeData.fblink} className='rounded-md border px-2 py-2 hover:bg-[#810101]'>
              <FaFacebookF />
            </a>
            <a
              href={HomeData.locationlink}
              className='rounded-md  border px-2 py-2 hover:bg-[#810101]'
            >
              <SiGooglemaps />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
