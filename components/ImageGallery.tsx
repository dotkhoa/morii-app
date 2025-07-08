import { useAuth } from "@/lib/authContext";
import { fetchImages } from "@/lib/images";
import type { Images } from "@/store/imageStore";
import useImageStore from "@/store/imageStore";
import useSelectedStore from "@/store/selectedStore";
import { useEffect } from "react";
import { ArcherElement } from "react-archer";
import ManagedImage from "./ManagedImage";
import { Checkbox } from "./ui/checkbox";

export default function ImageGallery() {
  const { user } = useAuth();
  const images = useImageStore((state) => state.image);
  const { setImage } = useImageStore();
  const { selectedIds, toggle, clearSelectedIds } = useSelectedStore();

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
      {Array.isArray(images) && images.length > 0 ? (
        <div
          className={
            "grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
          }
        >
          {images.map((image: Images, index: number) => (
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
      ) : (
        <div className="inline-flex w-fit pt-10 text-left">
          <ArcherElement
            id="title"
            relations={[
              {
                targetId: "upload",
                targetAnchor: "bottom",
                sourceAnchor: "right",
                style: { strokeWidth: 4, strokeColor: "#000" },
              },
            ]}
          >
            <p className="text-8xl font-semibold">Start your gallery</p>
          </ArcherElement>
          <div className="basis-1/2" />
        </div>
      )}
    </div>
  );
}
