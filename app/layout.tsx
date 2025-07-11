import { AuthProvider } from "@/lib/authContext";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morii",
  description:
    "Upload, browse, and delete images in a simple gallery powered by Supabase.",
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
