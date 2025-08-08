import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function Announcement() {
  return (
    <div className="bg-red-600 px-4 py-3 text-white flex items-center justify-end">
      <p className="text-center text-sm font-medium w-full hidden md:block">
        Love our services?
        <Link
          href="http://localhost:3000/review"
          // target="_blank"
          className="inline-block ml-2 underline"
        >
          take time to give us a review here please !
        </Link>
      </p>
      <div className='flex gap-1'>
        <Button>ENGLISH</Button>
        <Button>SINHALA</Button>
        <Button>TAMIL</Button>
      </div>
    </div>
  );
}
