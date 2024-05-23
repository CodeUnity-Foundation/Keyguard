import { cn } from "@keyguard/lib";
import "@keyguard/ui/styles/global.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

import { TrpcProvider } from "../providers/trpc.providers";
import { ToastDuration } from "../utils/constant";

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
          <NextTopLoader color="#FF725E" />
          {children}
          <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: ToastDuration }} />
        </TrpcProvider>
      </body>
    </html>
  );
}
