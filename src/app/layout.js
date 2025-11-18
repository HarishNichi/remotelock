"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AntdRegistry from './components/AntdRegistry';
import '../i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import LayoutWrapper from './components/LayoutWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nextProvider i18n={i18n}>
          <AntdRegistry>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AntdRegistry>
        </I18nextProvider>
      </body>
    </html>
  );
}
