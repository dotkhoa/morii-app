"use client";

import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import ImageUpload from "@/components/ImageUpload";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/lib/authContext";

export default function Home() {
  const { user, loading } = useAuth();
  return (
    <div>
      <Toaster position={"bottom-right"} richColors />
      <Header />
      {loading ? (
        <></>
      ) : user ? (
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center gap-8 px-4 text-xl">
          <ImageUpload />
          <ImageGallery />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center gap-8 px-4 text-xl">
          You are signed out.
        </div>
      )}
    </div>
  );
}
