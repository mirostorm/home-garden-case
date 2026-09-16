'use client';

import { AppSidebar } from '@/components/@layout';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui';
import { PropsWithChildren } from 'react';

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center transition-all ease-in-out">
          <SidebarTrigger className="ml-4" />
        </header>
        <main className="min-h-screen px-4 mx-auto w-full md:px-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
