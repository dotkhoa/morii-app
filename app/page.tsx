"use client";

import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/lib/authContext";
import { getImageUrl, loadImageList } from "@/lib/images";
import { useEffect, useState } from "react";
import ImageGallery from "../components/imageGallery";
import ImageUpload from "../components/imageUpload";

export default function Home() {
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const userId = user?.id;

  useEffect(() => {
    if (!user) return;

    const fetchImages = async () => {
      const images = await loadImageList(userId);
      await getImageUrl(images, setImages);
    };

    fetchImages();
  }, [user, userId]);

  return (
    <div>
      <Header />
      {user ? (
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-8 px-4 text-xl">
          <ImageUpload />
          <Toaster position={"top-center"} />
          <ImageGallery images={images} />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-8 px-4 text-xl">
          You are signed out.
        </div>
      )}
    </div>
  );
}
