"use client"
import React from 'react'
import { motion } from "motion/react";

function Header() {
  return (
    <div>
        <section className="py-14 lg:py-24 relative z-0 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
            <motion.h4
                   initial={{ y: -20, opacity: 0 }}
                   whileInView={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.3, duration: 0.5 }}
                   className="text-center mb-2 text-lg font-Ovo"
                 >
                   Connect with me
                 </motion.h4>
           aa
            <motion.h1
            
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl  text-gray-900 mb-5 md:text-5xl md:leading-normal">
                Control your Finances with our <span className="text-indigo-600">Smart Tool </span>
            </motion.h1>
            <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-500 mb-9">Invest
                intelligently
                and discover a better way to manage your entire wealth easily.</p>


        </div>
    </section>
    </div>
  )
}

export default Header