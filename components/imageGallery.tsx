import { useAuth } from "@/lib/authContext";
import { fetchImages } from "@/lib/images";
import type { Images } from "@/store/imageStore";
import useImageStore from "@/store/imageStore";
import useSelectedStore from "@/store/selectedStore";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export default function ImageGallery() {
  const { user } = useAuth();
  const images = useImageStore((state) => state.image);
  const { setImage } = useImageStore();
  const { selectedIds, toggle, clearSelectedIds } = useSelectedStore();

  const imageCount = images.length;

  useEffect(() => {
    if (!user) return;

    const getImages = async () => {
      clearSelectedIds();
      const images = await fetchImages(user?.id);
      setImage(images || []);
    };

    getImages();
  }, [user]);

  return (
    <div className="flex w-full max-w-[50rem] flex-col items-center px-4">
      <Button
        className="mb-2 w-16"
        variant="outline"
      >{`${imageCount}/10`}</Button>
      <div
        className={
          "grid auto-rows-[10rem] grid-cols-2 gap-2 border-9 md:auto-rows-[12rem] md:grid-cols-3 lg:auto-rows-[10rem] lg:grid-cols-4"
        }
      >
        {images &&
          images.length > 0 &&
          images.map((image: Images, index: number) => (
            <label
              className="group relative aspect-square h-full w-full overflow-hidden"
              key={index}
            >
              <div
                className={`absolute top-2 right-2 z-10 transition-opacity ${selectedIds.has(image) ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
              >
                <Checkbox
                  checked={selectedIds.has(image)}
                  onCheckedChange={() => toggle(image)}
                />
              </div>
              <Image
                alt=""
                src={image.url}
                style={{ objectFit: "cover" }}
                fill
                priority
              />
            </label>
          ))}
      </div>
    </div>
  );
}
