import Link from 'next/link';
import SidebarMenu from './sidebar-menu';
import HeroCarousel from './hero-carousel';
import { getBanners } from '@/actions/banners';
import { CircleDollarSign, FolderSync, HelpCircle } from 'lucide-react';
import { Banner } from '@prisma/client';

interface IProps {
  banners: Banner[] | null | undefined;
}
export default function Hero({ banners }: IProps) {
  return (
        <div className="grid grid-cols-12 gap-4  ">
      {/* <SidebarMenu /> */}
      
      <div className="col-span-full  rounded-md">
        <HeroCarousel banners={banners} />
      </div>
      
    </div>
  );
}
