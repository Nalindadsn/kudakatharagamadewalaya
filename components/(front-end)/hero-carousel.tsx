"use client" 
import React from 'react'
import EmblaCarousel from '../js/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import Header from '../js/Header'
import Footer from '../js/Footer'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

function HeroCarousel({banners}:any) {
  const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className='overflow-hidden  h-full flex items-center'>
          {/* <Header /> */}
    <EmblaCarousel slides={SLIDES} options={OPTIONS} banners={banners}/>
    {/* <Footer /> */}
    </div>
  )
}

export default HeroCarousel