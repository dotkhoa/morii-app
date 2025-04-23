"use client";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, useSession, useUser } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { getImageUrl, loadImageList } from "@/lib/images";
import { createClerkSupabaseClient } from "@/lib/auth";
import ImageGallery from "../components/imageGallery";
import ImageUpload from "../components/imageUpload";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);

  const { user } = useUser();
  const userId = user?.id;

  const { session } = useSession();
  const client = createClerkSupabaseClient(session);

  useEffect(() => {
    if (!user) return;

    const fetchImages = async () => {
      const images = await loadImageList(client, userId);
      await getImageUrl(images, client, setImages);
    };

    fetchImages();
  }, [user, userId]);

  return (
    <div>
      <Header />
      <SignedOut>
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-8 px-4 text-xl">
          You are signed out.
        </div>
      </SignedOut>
      <SignedIn>
        <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-8 px-4 text-xl">
          <ImageUpload client={client} userId={userId} />
          <Toaster position={"top-center"} />
          <ImageGallery images={images} />
        </div>
      </SignedIn>
    </div>
  );
}
