'use client'

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import PageTransition from "@/components/ui/PageTransition";
import ReduxProvider from "./reduxProvider";

export default function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noNavbarRoutes = ['/login', '/register', '/forgot-password', '/profile-settings', '/admin'];
  const shouldHideNavbar = noNavbarRoutes.includes(pathname);

  return (
    <ReduxProvider>
      <PageTransition>
        {!shouldHideNavbar && <Navbar />}
        {children}
      </PageTransition>
    </ReduxProvider>
  );
}