"use client"
import Image from 'next/image'
import React, { useState, useCallback } from 'react'

const PLACEHOLDER_SRC = `Loading...`

type PropType = {
  imgSrc: string
  inView: boolean
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView } = props
  const [hasLoaded, setHasLoaded] = useState(false)

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true)
  }, [inView, setHasLoaded])

  return (<>
  <div className={"".concat(
          hasLoaded ? ' embla__lazy-load--has-loaded' : ''
        )}>
                    {!hasLoaded && <span className="embla__lazy-load__spinner  w-full h-[200px] " />}

                {/* <Link href={banner.link}> */}
               
              {/* <img
          className="embla__slide__img embla__lazy-load__img"
          onLoad={setLoaded}
          src={inView ? imgSrc : PLACEHOLDER_SRC}
          alt="Your alt text"
          data-src={imgSrc}
        /> */}

               <Image
                              width={1080}
                              height={700}
                              src={inView ? imgSrc : "/file.svg"}
                               onLoad={setLoaded}
                              className="embla__slide__img embla__lazy-load__img w-full h-full object-cover"
                              alt={"banner.title"}
                              priority
                               data-src={imgSrc}
                            />
                {/* </Link> */}
                <div className="hidden md:block text-sm absolute top-2 right-5 bg-red-600 text-white p-3  flex items-center gap-2 opacity-[.9] transition duration-300 ease-in-out  hover:opacity-[1] border border-white">
                  {/* <span className="w-2 h-2 bg-black rounded-full border-6 border-double"></span>{" "} */}
                  test adsas as a aas a ssahdga sdjashgd jasgd sajg
                </div>
              </div>
  {/* <div className="embla__slide">
      <div
        className={' bg-gray-800 absolute top-0 embla__lazy-load'.concat(
          hasLoaded ? ' embla__lazy-load--has-loaded' : ''
        )}
      >
        {!hasLoaded && <span className="embla__lazy-load__spinner" />}
        
        
        <img
          className="embla__slide__img embla__lazy-load__img w-full h-full object-cover"
          onLoad={setLoaded}
          src={inView ? imgSrc : PLACEHOLDER_SRC}
          alt="Your alt text"
          data-src={imgSrc}
        />
        
      </div>
    </div> */}
  </>
    
  )
}
