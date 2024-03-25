import { cn } from "@keyguard/lib";
import { Toaster } from "@keyguard/ui";
import "@keyguard/ui/styles/global.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";

import { TrpcProvider } from "../providers/trpc.providers";

const roboto = Roboto({
  display: "auto",
  weight: ["300", "100", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Keyguard",
    default: "Keyguard",
  },
  icons: {
    icon: "../assets/logo.png",
  },
  description: "Secure password manager for everyone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/assets/icon.png" sizes="any" />
      </Head>
      <body className={cn(`flex h-screen`, roboto.className)}>
        <TrpcProvider>
          {children}
          <Toaster />
        </TrpcProvider>
      </body>
    </html>
  );
}
