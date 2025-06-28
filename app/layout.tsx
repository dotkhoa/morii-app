import { AuthProvider } from "@/lib/authContext";
import { Analytics } from "@vercel/analytics/react";
import { BotIdClient } from "botid/client";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morii",
  description: "Share photos with friends.",
};

const protectedRoutes = [
  {
    path: "/api/image-urls",
    method: "OPTIONS",
  },
  {
    path: "/api/image-urls",
    method: "POST",
  },
  {
    path: "/login",
    method: "POST",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <head>
          <BotIdClient protect={protectedRoutes} />
        </head>
        <body>
          <div>{children}</div>
          <Analytics />
        </body>
      </AuthProvider>
    </html>
  );
}
