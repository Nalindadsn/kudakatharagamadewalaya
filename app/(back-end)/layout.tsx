import { AppSidebar } from '@/components/(back-end)/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
// import "@uploadthing/react/styles.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session:any = await auth();
  // console.log('Session;', session);

  const sessionRole = session? session?.user?.role: null;
  const userRole = 'ADMIN';

  if (!session) {
    redirect('/login');
  }

  if (!sessionRole) {
    return notFound();
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
