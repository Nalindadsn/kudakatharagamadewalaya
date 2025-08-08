"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress";
import { PlayCircle, StopCircle } from "lucide-react";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  banners: any;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, banners } = props;
  // const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 9000 }),
  ]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);




   const [displayCorsel, setDisplayCorsel] = useState(false);

  useEffect(() => {
    // Set a timeout to update the displayCorsel after 2 seconds
    const timerId = setTimeout(() => {
      setDisplayCorsel(true);
    }, 1000); // 2000 milliseconds = 2 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearTimeout(timerId);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return !displayCorsel?"LOADING CORSEL":(
    <section className="embla relative">
      {/* {JSON.stringify(slides)} */}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {banners?.map((banner: any, index: number) => (
            <div className="embla__slide shadow relative" key={index}>
              {/* <Link href={banner.link}> */}
<Image
              width={1080}
              height={1080}
              src={banner.imageUrl}
              className="w-full h-full object-cover"
              alt={banner.title }
              priority
            />
              {/* </Link> */}
              <div className="hidden md:block text-sm absolute top-2 right-5 bg-red-600 text-white p-3  flex items-center gap-2 opacity-[.9] transition duration-300 ease-in-out  hover:opacity-[1] border border-white">
                {/* <span className="w-5 h-5 bg-black rounded-full border-6 border-double"></span>{" "} */}
                test adsas as a aas a ssahdga sdjashgd jasgd sajg
              </div>
            </div>
          ))}

          {/* ))} */}
        </div>
      </div>

      <div className="embla__controls absolute bottom-8 right-[-10%]">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full gap-2 justify-center items-center mt-3">
      <div
        className={`w-full  embla__progress`.concat(
          showAutoplayProgress ? "" : " embla__progress--hidden"
        )}
      >
        {}
        <div className="embla__progress__bar" ref={progressNode}></div>
      </div>
      <button className="embla__play" onClick={toggleAutoplay} >
        {autoplayIsPlaying ? <StopCircle/> : <PlayCircle/>}
      </button>
      </div>
    </section>
  );
};

export default EmblaCarousel;
