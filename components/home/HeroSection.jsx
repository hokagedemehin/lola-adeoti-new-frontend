import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const HeroSection = () => {
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

  return (
    <div ref={sliderRef} className='keen-slider border-2'>
      <div className='keen-slider__slide number-slide1 flex h-[25rem] w-screen items-center  justify-center border-2 bg-green-200 text-2xl font-bold sm:h-[30rem] '>
        1{' '}
      </div>
      <div
        className='keen-slider__slide number-slide2 
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-green-200 text-2xl font-bold sm:h-[30rem]
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
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-green-200 text-2xl font-bold sm:h-[30rem]
       '
      >
        4
      </div>
      <div
        className='keen-slider__slide number-slide5 
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-green-200 text-2xl font-bold sm:h-[30rem]
      '
      >
        5
      </div>
      <div
        className='keen-slider__slide number-slide6 
      flex h-[25rem] w-screen items-center  justify-center border-2 bg-green-200 text-2xl font-bold sm:h-[30rem]'
      >
        6
      </div>
    </div>
  );
};

export default HeroSection;
