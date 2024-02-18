import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { cn } from '@vaultmaster/lib/cn';
import '@vaultmaster/ui/styles/global.css';

// const poppins = Poppins({
//   subsets: ['latin'],
//   variable: '--font-poppins',
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// });

export const metadata: Metadata = {
  title: {
    template: '%s | VaultMaster',
    default: 'VaultMaster',
  },
  description: 'Secure password manager for everyone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(`flex h-screen`)}>{children}</body>
    </html>
  );
}
