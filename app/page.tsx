"use client";

import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/lib/authContext";
import ImageGallery from "../components/imageGallery";
import ImageUpload from "../components/imageUpload";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <Toaster position={"bottom-right"} richColors />
      <Header />
      {user ? (
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-8 px-4 text-xl">
          <ImageUpload />
          <ImageGallery />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-8 px-4 text-xl">
          You are signed out.
        </div>
      )}
    </div>
  );
}
