"use client";

import { usePathname } from 'next/navigation';
import AdminLayout from './AdminLayout';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <>
      {isLoginPage ? (
        children
      ) : (
        <AdminLayout>{children}</AdminLayout>
      )}
    </>
  );
}