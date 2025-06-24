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
    <div className="flex flex-col items-end">
      <Button
        className="mb-2 w-16"
        variant="outline"
      >{`${imageCount}/10`}</Button>
      <div className={"grid grid-cols-3 flex-wrap border-9"}>
        {images &&
          images.length > 0 &&
          images.map((image: Images, index: number) => (
            <label key={index}>
              <Checkbox
                checked={selectedIds.has(image)}
                onCheckedChange={() => toggle(image)}
              />
              <Image alt="" src={image.url} height={200} width={200} priority />
            </label>
          ))}
      </div>
    </div>
  );
}
