"use client";

import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import Toolbar from "@/components/Toolbar";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/lib/authContext";
import dynamic from "next/dynamic";

const ArcherContainer = dynamic(
  () => import("react-archer").then((m) => m.ArcherContainer),
  { ssr: false },
);

export default function Home() {
  const { user, loading } = useAuth();
  return (
    <div>
      <Toaster position={"bottom-right"} richColors visibleToasts={10} />
      <Header />
      {loading ? (
        <></>
      ) : user ? (
        <ArcherContainer strokeColor="#000" strokeWidth={4}>
          <div className="mx-auto flex w-full max-w-screen-md flex-col items-center gap-8 px-4 text-xl">
            <Toolbar />
            <ImageGallery />
          </div>
        </ArcherContainer>
      ) : (
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center gap-8 px-4 text-xl">
          You are signed out.
        </div>
      )}
    </div>
  );
}
