import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { cn } from '@vaultmaster/lib/cn';
import '@vaultmaster/ui/styles/global.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: '200',
});

export const metadata: Metadata = {
  title: 'VaultMaster',
  description: 'Secure password manager for everyone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={''}>{children}</body>
    </html>
  );
}
