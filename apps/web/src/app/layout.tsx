import { cn } from "@keyguard/lib";
import "@keyguard/ui/styles/global.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

import AuthTokenHandler from "../components/auth/AuthTokenHandler";
import { ThemeProvider } from "../providers/theme.provider";
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
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon.png",
    },
  ],
  description: "Secure password manager for everyone",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="description" content="Keyguard - Secure password manager for everyone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={cn(`flex h-screen`, roboto.className)}>
        <TrpcProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextTopLoader color="#FF725E" />
            <AuthTokenHandler>{children}</AuthTokenHandler>
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: ToastDuration }} />
          </ThemeProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
