"use client";

import Header from "@/components/Header";
import ImageGallery from "@/components/ImageGallery";
import Toolbar from "@/components/Toolbar";
import { MotionButton } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/lib/authContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const ArcherContainer = dynamic(
  () => import("react-archer").then((m) => m.ArcherContainer),
  { ssr: false },
);

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <div>
      <Toaster position={"bottom-right"} richColors visibleToasts={10} />
      {loading ? (
        <></>
      ) : user ? (
        <>
          <Header />
          <ArcherContainer strokeColor="#000" strokeWidth={4}>
            <div className="mx-auto flex w-full max-w-screen-md flex-col items-center gap-8 px-4">
              <Toolbar />
              <ImageGallery />
            </div>
          </ArcherContainer>
        </>
      ) : (
        <div className="mx-auto flex h-screen flex-col items-center justify-center gap-8 px-4">
          <div className="align-center flex flex-col items-center justify-center">
            <div className="text-9xl font-semibold">Morii</div>
            <div className="pb-2 text-xl text-gray-600 italic">
              (moh-ree): the desire to capture a fleeting experience.
            </div>
            <div className="text-xl font-medium">
              Upload, browse, and delete images in a simple gallery powered by
              Supabase.
            </div>
          </div>
          <div>
            <MotionButton
              className={"p-6 text-lg"}
              onClick={() => router.push("/login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
            >
              {"Sign In"}
            </MotionButton>
          </div>
        </div>
      )}
    </div>
  );
}
