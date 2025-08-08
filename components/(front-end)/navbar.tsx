'use client';

import { CONTACT_INFO } from '@/constants/contacts';
import { siteConfig } from '@/constants/site';
import { LogIn, PhoneCall, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Announcement from '../announcement';
// import SearchForm from '../forms/search-from';
import Loader from '../loader';
import UserAvatar from '../user-avatar';
import { Button } from '../ui/button';
// import CartCount from './cart-count';


export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (pathname === '/on-boarding') {
    return null;
  }

  if (status === 'loading') {
    return pathname.includes("/dashboard")?"...": <div>
      <div className="">
        <div className="bg-red-600 px-4 py-3 text-white flex items-center justify-end">
      {/* <p className="text-center text-sm font-medium w-full hidden md:block">
         loading
      </p> */}
      <div role="status" className="animate-pulse w-full">
    <div className="flex items-center justify-center  w-full">
        
        <div className="w-[50%] h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
    <span className="sr-only">Loading...</span>
</div>
      <div className='flex gap-1'>
        <Button>ENGLISH</Button>
        <Button>SINHALA</Button>
        <Button>TAMIL</Button>
      </div>
    </div>
      </div>
      <div className="bg-white shadow sticky top-0 z-40 w-full backdrop-blur-md">
        <div className="lg:w-[1185px] container flex items-center justify-between lg:pt-3.5 pt-0 px-2 gap-6 mx-auto">
          {/* Logo */}
          <Link className="" href="/">
            {/* <Image
              src={siteConfig.logo || '/Logo.png'}
              alt={siteConfig.description || siteConfig.name}
              width={400}
              height={400}
              className="md:w-36 w-28 mt-1"
            /> */}LEARNERS
          </Link>

          {/* SEARCH */}
          <div className="flex-grow hidden md:flex">
            <div className="w-full">
              
              <ul className='overflow-auto flex items-center gap-4 text-red-500 font-bold'>
                <li>
                  <Link href={`/`}>Home</Link>
                </li>
                <li>
                  <Link href={`/history`}>Histoy</Link>
                </li>
                <li>
                  <Link href={`/gallery`}>Gallery</Link>
                </li>
                <li>
                  <Link href={`/about-us`}>About Us</Link>
                </li>
                <li>
                  <Link href={`/contact-us`}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sm:flex hidden">
            <div className="flex gap-3">
              <div>
                <PhoneCall className="mt-3" />
              </div>
              <div>
                <h4>
                  <b>{CONTACT_INFO.supportHours}:</b>
                </h4>
                <p>{CONTACT_INFO.supportNumber}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 lg:gap-2 ml-2 p-2">
              {/* <CartCount /> */}s
              {/* {status == 'unauthenticated' && (<div className='ml-3'>
                <Link
                  href="/login"
                  prefetch={true}
                  className="flex gap-1 items-center border px-5 py-2 rounded-full"
                >
                  <LogIn className='w-4 h-4'/>
                  <span className="md:flex ">Login</span>
                </Link>
                
                
                </div>
              )} */}
              <div className="ml-3">
                 <svg className="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
                {/* <UserAvatar user={session?.user} /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-1 pb-2 px-2 border-t-1 md:border-t-0">
          <div className="flex md:hidden mx-auto">
            <div className="flex overflow-hidden w-full">
              <ul className='overflow-auto flex items-center gap-4 text-red-500 font-bold'>
                <li>
                  <Link href={`/`}>Home</Link>
                </li>
                <li>
                  <Link href={`/history`}>History</Link>
                </li>
                <li>
                  <Link href={`/gallery`}>Gallery</Link>
                </li>
                <li>
                  <Link href={`/about-us`}>About Us</Link>
                </li>
                <li>
                  <Link href={`/contact-us`}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

  return pathname.includes("/dashboard")?"":(
    <>
      <div className="">
        <Announcement />
      </div>
      <div className="bg-white shadow sticky top-0 z-40 w-full backdrop-blur-md">
        <div className="lg:w-[1185px] container flex items-center justify-between lg:pt-3.5 pt-0 px-2 gap-6 mx-auto">
          {/* Logo */}
          <Link className="" href="/">
            {/* <Image
              src={siteConfig.logo || '/Logo.png'}
              alt={siteConfig.description || siteConfig.name}
              width={400}
              height={400}
              className="md:w-36 w-28 mt-1"
            /> */}LEARNERS
          </Link>

          {/* SEARCH */}
          <div className="flex-grow hidden md:flex">
            <div className="w-full">
              
              <ul className='overflow-auto flex items-center gap-4 text-red-500 font-bold'>
                <li>
                  <Link href={`/`}>Home</Link>
                </li>
                <li>
                  <Link href={`/history`}>History</Link>
                </li>
                <li>
                  <Link href={`/gallery`}>Gallery</Link>
                </li>
                <li>
                  <Link href={`/about-us`}>About Us</Link>
                </li>
                <li>
                  <Link href={`/contact-us`}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="sm:flex hidden">
            <div className="flex gap-3">
              <div>
                <PhoneCall className="mt-3" />
              </div>
              <div>
                <h4>
                  <b>{CONTACT_INFO.supportHours}:</b>
                </h4>
                <p>{CONTACT_INFO.supportNumber}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 lg:gap-2 ml-2 p-2">
              {/* <CartCount /> */}s
              {status == 'unauthenticated' && (<div className='ml-3'>
                <Link
                  href="/login"
                  prefetch={true}
                  className="flex gap-1 items-center border px-5 py-2 rounded-full"
                >
                  <LogIn className='w-4 h-4'/>
                  <span className="md:flex ">Login</span>
                </Link>
                
                
                </div>
              )}
              <div className="ml-3">
                <UserAvatar user={session?.user} />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-1 pb-2 px-2 border-t-1 md:border-t-0">
          <div className="flex md:hidden mx-auto">
            <div className="flex overflow-hidden w-full">
              <ul className='overflow-auto flex items-center gap-4 text-red-500 font-bold'>
                <li>
                  <Link href={`/`}>Home</Link>
                </li>
                <li>
                  <Link href={`/gallery`}>Gallery</Link>
                </li>
                <li>
                  <Link href={`/about-us`}>About Us</Link>
                </li>
                <li>
                  <Link href={`/contact-us`}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
