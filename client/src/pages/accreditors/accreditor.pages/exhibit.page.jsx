import exhibit_banner from '@/assets/homeAssets/img8.webp';
import ImageTopBanner from '@/components/accreditors/image.top.banner';
import common from '@/configs/common.config';
import imgSource from '@/configs/img.configs';
import { animated, useSpring } from '@react-spring/web';
import { default as React, default as React } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layout/main.layout';
import PortalSection from '../layout/portal.section';

const ExhibitPage = () => {
  // Define the spring animation
  const [springs, api] = useSpring(
    () => ({
      opacity: 1,
      transform: 'translateY(0px)',
      scale: 1,
      from: { opacity: 0, transform: 'translateY(-10px)', scale: 1 },
      config: {
        mass: 1,
        tension: 180,
        friction: 12,
      },
    }),
    []
  );

  // Event handlers for hover
  const handleMouseEnter = () => {
    api.start({ scale: 1.2 }); // Scale up on hover
  };

  const handleMouseLeave = () => {
    api.start({ scale: 1 }); // Scale back down when hover ends
  };
  return (
    <MainLayout>
      <ImageTopBanner imgSource={imgSource.title_banner} banner_title={'EXHIBIT'} />
      <section className='flex w-full items-center justify-center bg-gradient-to-r from-amber-300 to-yellow-50 min-h-[50vh] p-7'>
        <div className='flex w-[57%] justify-between'>
          <div className='flex flex-col gap-5'>
            <h1 className='font-semibold text-3xl'>Contents:</h1>
            {common.exhibitPaths.map((item, index) => (
              <Link key={index} to={item.path} className='text-xl text-green-950 hover:underline'>
                {item.text}
              </Link>
            ))}
          </div>
          <div className='flex items-center justify-center w-[65%]'>
            {/* Apply the spring animation to the img element */}
            <animated.img
              src={imgSource.pylon_ngayon}
              style={{
                transform: springs.scale.to((scale) => `scale(${scale})`),
              }}
              className='flex object-center z-[10]'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        </div>
      </section>

      {common.exhibitPaths.map((item, index) => (
        <PortalSection portalLink={item.path} sectionTitle={item.text} folderImage={item.image} />
      ))}
      <ImageTopBanner imgSource={exhibit_banner} />
      <section className='bg-blue-50 min-h-[50vh]'>sdfd</section>
      <section className='bg-red-50 min-h-[50vh]'>sdfd</section>
      <section className='bg-blue-50 min-h-[50vh]'>sdfdf</section>
      <section className='bg-red-50 min-h-[50vh]'>dsfdf</section>
      <section className='bg-blue-50 min-h-[50vh]'>sdfdf</section>
      <section className='bg-red-50 min-h-[50vh]'>sdfd</section>
    </MainLayout>
  );
};

export default ExhibitPage;
