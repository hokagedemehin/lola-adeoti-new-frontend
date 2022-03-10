import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const PersonalitySection = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          origin: 'center',
          perView: 2,
          spacing: 15,
        },
      },
    },
    slides: {
      origin: 'center',
      perView: 1,
      spacing: 15,
    },
  });

  return (
    <div ref={sliderRef} className='keen-slider border-2'>
      <div className='keen-slider__slide number-slide1 flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-blue-200 text-2xl font-bold sm:h-[30rem] '>
        1{' '}
      </div>
      <div
        className='keen-slider__slide number-slide2 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-yellow-200 text-2xl font-bold sm:h-[30rem]
      '
      >
        2
      </div>
      <div
        className='keen-slider__slide number-slide3 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-green-200 text-2xl font-bold sm:h-[30rem]
      '
      >
        3
      </div>
      <div
        className='keen-slider__slide number-slide4 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-cyan-200 text-2xl font-bold sm:h-[30rem]
       '
      >
        4
      </div>
      <div
        className='keen-slider__slide number-slide5 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-red-200 text-2xl font-bold sm:h-[30rem]
      '
      >
        5
      </div>
      <div
        className='keen-slider__slide number-slide6 
      flex h-[25rem] w-[20rem] items-center  justify-center border-2 bg-orange-200 text-2xl font-bold sm:h-[30rem]'
      >
        6
      </div>
    </div>
  );
};

export default PersonalitySection;
