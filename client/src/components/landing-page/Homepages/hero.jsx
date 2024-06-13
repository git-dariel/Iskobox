import React from 'react';
import '../../../index.css';
import { HomeData } from '@/configs/LanfingPageConfigs/homepage.data';

export default function Hero() {
  return (
    <>
      <section
        className='bg-gradient-to-r from-[#DCA819] via-[#cebb69] to-[#ffffff] select-none '
        // style={{ backgroundImage: `url(${HomeData.img3})` }} bg-cover bg-no-repeat bg-center bg-seal bg-fixed
      >
        <div className='-2 mx-auto  px-4 py-32 lg:flex lg:h-screen lg:items-center '>
          <div className='flex flex-col gap-10 mx-auto max-w-3xl text-center items-center'>
            <h1 className=' text-border-[#ffffff]   text-[#810101] text-3xl font-extrabold  sm:text-5xl lg:text-6xl lg:w-[1010px]'>
              <span>{HomeData.pupname1}</span>
              <br />
              <span>{HomeData.pupname2}</span>
              <br />
              <span>{HomeData.pupname3}</span>
            </h1>

            <h1 className='border-[#810101]  text-[#810101]  text-3xl font-extrabold  sm:text-5xl lg:w-[500px] lg:text-6xl border-b md:w-[400px] '>
              {HomeData.pupbranch}
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
