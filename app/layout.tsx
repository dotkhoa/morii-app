import { AuthProvider } from "@/lib/authContext";
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
      <AuthProvider>
        <body>
          <div>{children}</div>
          <Analytics />
        </body>
      </AuthProvider>
    </html>
  );
}
