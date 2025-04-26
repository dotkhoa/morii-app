import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morii",
  description: "Share photos with friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <div>{children}</div>
          <Analytics />
        </body>
      </ClerkProvider>
    </html>
  );
}
