import React, { useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import AOS from 'aos';

const CampaignSection = ({ data }) => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  useEffect(() => {
    AOS.init();
  }, []);

  // console.log('data', data);

  return (
    <div ref={sliderRef} className='keen-slider pt-10 sm:pt-20'>
      {data &&
        data.map((img, id) => (
          <div
            key={`${img.id}-${id}`}
            className='keen-slider__slide number-slide1 relative flex h-[25rem] w-screen items-center justify-center sm:h-[40rem] '
            // data-aos='flip-left'
            // data-aos-duration='1000'
          >
            <Image
              src={img?.attributes?.image?.data?.attributes?.url}
              layout='fill'
              objectFit='contain'
              placeholder='blur'
              blurDataURL={
                img?.attributes?.image?.data?.attributes?.formats?.small?.url
              }
              alt={img?.attributes?.name}
              // className='hidden'
              // objectPosition='right'
              // style={{ display: 'none' }}
            />

            {/* </div> */}
          </div>
        ))}
    </div>
  );
};

export default CampaignSection;

/**
 * <div
        className='keen-slider__slide number-slide2 
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-yellow-200 text-2xl font-bold sm:h-[30rem]
      '
      >
        2
      </div>
      <div
        className='keen-slider__slide number-slide3 
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-green-200 text-2xl font-bold sm:h-[30rem]
      '
      >
        3
      </div>
      <div
        className='keen-slider__slide number-slide4 
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-cyan-200 text-2xl font-bold sm:h-[30rem]
       '
      >
        4
      </div>
      <div
        className='keen-slider__slide number-slide5 
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-red-200 text-2xl font-bold sm:h-[30rem]
      '
      >
        5
      </div>
      <div
        className='keen-slider__slide number-slide6 
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-orange-200 text-2xl font-bold sm:h-[30rem]'
      >
        6
      </div>
 */
