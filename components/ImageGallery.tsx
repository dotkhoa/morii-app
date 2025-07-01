import { useAuth } from "@/lib/authContext";
import { fetchImages } from "@/lib/images";
import type { Images } from "@/store/imageStore";
import useImageStore from "@/store/imageStore";
import useSelectedStore from "@/store/selectedStore";
import { useEffect } from "react";
import ManagedImage from "./ManagedImage";
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
    <div className="mb-8 flex w-full max-w-[50rem] flex-col items-center px-4">
      <Button
        className="mb-2 w-16"
        variant="outline"
      >{`${imageCount}/10`}</Button>
      <div
        className={
          "grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {images &&
          images.length > 0 &&
          images.map((image: Images, index: number) => (
            <label
              className="group relative aspect-square overflow-hidden"
              key={index}
            >
              <div
                className={`transition-opacity ${selectedIds.has(image) ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}
              >
                <Checkbox
                  className="absolute top-2 right-2 z-10"
                  checked={selectedIds.has(image)}
                  onCheckedChange={() => toggle(image)}
                />
              </div>
              <ManagedImage
                src={image.url}
                fill
                priority
                className="object-cover select-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </label>
          ))}
      </div>
    </div>
  );
}
