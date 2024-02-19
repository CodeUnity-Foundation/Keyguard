import type { Metadata } from 'next';
import Head from 'next/head';
import { Roboto } from 'next/font/google';
import { cn } from '@vaultmaster/lib/cn';
import '@vaultmaster/ui/styles/global.css';

const roboto = Roboto({
  display: 'auto',
  weight: ['300', '100', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | VaultMaster',
    default: 'VaultMaster',
  },
  icons: {
    icon: '../assets/logo.png',
  },
  description: 'Secure password manager for everyone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/assets/icon.png" sizes="any" />
      </Head>
      <body className={cn(`flex h-screen`, roboto.className)}>{children}</body>
    </html>
  );
}
