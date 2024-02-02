import '@/app/globals.css';
import { auth } from '@/auth';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth App',
  description: 'Auth App is a Next.js app with authentication and authorization'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <link rel="icon" href="/favicon.ico" />
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
