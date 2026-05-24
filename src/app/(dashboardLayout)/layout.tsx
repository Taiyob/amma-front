'use client';

import { Suspense } from 'react';
import DashboardSidebar from '@/Sidebar/DashboardSidebar';
import DashboardHeader from '@/Sidebar/DashboardHeader';
import PatientChatbot from '@/components/commonLayout/patient/components/chat/PatientChatbot';
import { useAppSelector } from '@/redux/hooks';
import { UserRole } from '@/types';

// Client-only wrapper for pathname/searchParams
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  // const {usePathname, useSearchParams} = require('next/navigation');
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.auth.user);
  // console.log(user);

  // Determine role
  // let role: 'ADMIN' | 'PATIENT' | 'STAFF' | null = null;

  // if (pathname.includes('/admin')) role = 'ADMIN';
  // else if (pathname.includes('/patient')) role = 'PATIENT';
  // else if (pathname.includes('/staff')) role = 'STAFF';

  // if (!role) {
  //   const roleFromQuery = searchParams.get('role');
  //   if (['ADMIN', 'PATIENT', 'STAFF'].includes(roleFromQuery ?? '')) {
  //     role = roleFromQuery as 'ADMIN' | 'PATIENT' | 'STAFF';
  //   }
  // }

  const role: UserRole = user?.role as UserRole;

  return (
    <div className="flex h-screen bg-muted/10 overflow-hidden">
      {role && <DashboardSidebar role={role} />}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
      {role === 'PATIENT' && <PatientChatbot />}
    </div>
  );
}
