
import Providers from '@/context/providers';

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";



// import { Analytics } from '@vercel/analytics/react';
import NextTopLoader from "nextjs-toploader";

import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/(front-end)/navbar';
import Footer from '@/components/(front-end)/footer';
// import Navbar from "@/components/(front-end)/navbar";
// import Footer from '@/components/(front-end)/footer';
// import "@uploadthing/react/styles.css";

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const SegoeUI = localFont({
  src: './fonts/SegoeUI.woff',
  variable: '--font-segoe-ui',
});

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'MyE-Commerce | Where Trends Are Born',
    template: '%s | MyE-Commerce',
  },
  description:
    "Discover a wide range of quality products at MyE-Commerce where trends are born, located in Sri Lanka.. Explore our extensive collection, including fashion, beauty products, and more. From the latest beauty products to trendy fashion, we've got it all. Call us at +94704238939 for personalized assistance and unbeatable deals.",
  applicationName: 'MyE-Commerce',
  keywords: [
    'MyE-Commerce Store',
    'Sri Lanka Town Center',
    'electronics',
    'fashion',
    'gadgets',
    'trendy fashion',
    'personalized assistance',
    'unbeatable deals',
    'one-stop shop',
    'quality products',
    'tech accessories',
    'home appliances',
    'affordable fashion',
    'student discounts',
    'local business',
    'convenient shopping',
    'online store',
    'best prices',
    'customer satisfaction',
    'top brands',
    'latest trends',
  ],
  authors: [{ name: 'Md. Roshidul Hasan', url: 'https://www.MyE-Commerce.com' }],
  creator: 'MyE-Commerce Developer Team | Affordable Software developer',
  publisher: 'MyE-Commerce Developer Team | Affordable Software developer',
  openGraph: {
    title: {
      default:
        'MyE-Commerce | Where Trends Are Born - Your One-Stop Shop for All Your Needs',
      template: '%s | MyE-Commerce Store',
    },
    description:
      "Discover a wide range of quality products at MyE-Commerce Store, located in Sri Lankai. Explore our extensive collection, including fashion, electronics, and more. From the latest gadgets to trendy fashion, we've got it all. Call us at +94704238939 for personalized assistance and unbeatable deals.",
    url: 'http://MyE-Commerce.com',
    siteName: 'MyE-Commerce store',
    type: 'website',
    local: 'en_us',
    images: [
      {
        url: 'https://www.MyE-Commerce.com/opengraph-image.png',
        width: 800,
        height: 600,
        alt: 'MyE-Commerce | Where Trends Are Born',
      },
    ],
    locale: 'en_US',
  },
  alternates: {
    canonical: '/',
    languages: ['en'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T5GV6KQX');
            `,
          }}
        />
        {/* Other Meta Tags */}
        <meta
          name="facebook-domain-verification"
          content="pzi59zqi0qrjrv2rbtdiflwivnynhz"
        />
        <meta
          name="google-site-verification"
          content="MZrG05ej8tcAbK1d7W9RCA9JTHIG5Z8zdz_EHKMycfI"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${SegoeUI.variable} antialiased `}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T5GV6KQX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        


         <NextTopLoader
                color="#111"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #111,0 0 5px #111"
                template='<div class="bar" role="bar"><div class="peg"></div></div> 
      <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                zIndex={1600}
                showAtBottom={false}
              />
               <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Providers>
              <Navbar/>
              
          {children}
          {/* <Analytics /> */}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
