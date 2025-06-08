import { useAuth } from "@/lib/authContext";
import { fetchImages } from "@/lib/images";
import useImageStore from "@/store/imageStore";
import Image from "next/image";
import { useEffect } from "react";

export default function ImageGallery() {
  const { user } = useAuth();
  const images = useImageStore((state) => state.image);
  const { setImage } = useImageStore();

  useEffect(() => {
    if (!user) return;

    const getImages = async () => {
      const images = await fetchImages(user?.id);
      setImage(images || []);
    };

    getImages();
  }, [user]);

  return (
    <div className={"boarder-9 flex flex-wrap border-b-fuchsia-600"}>
      {images &&
        images.length > 0 &&
        images.map((image: string, index: number) => (
          <Image
            key={index}
            alt=""
            src={image}
            height={200}
            width={200}
            priority
          />
        ))}
    </div>
  );
}
