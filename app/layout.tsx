import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { UserProvider } from '@auth0/nextjs-auth0/client';

// import FooterComponent from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ESGNature',
  description: 'Under Development',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <body className={inter.className}>
        <div className="flex-col h-screen">
          <Header />
          <div role="main" className="bg-greengray flex-grow h-[calc(100vh-100px)]">
            {children}
          </div>
          {/* <FooterComponent /> */}
        </div>
      </body>
      </UserProvider>
    </html>
  );
}
