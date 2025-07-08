import { Button } from "@/components/ui/button";
import useImageStore from "@/store/imageStore";
import { useEffect, useState } from "react";
import { ArcherElement } from "react-archer";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import ImageUpload from "./ImageUpload";
import { Separator } from "./ui/separator";

export default function Toolbar() {
  const { image } = useImageStore();
  const [imageCount, setImageCount] = useState<string>("");

  useEffect(() => {
    if (image.length === 0) {
      setImageCount("00");
    } else {
      const imageCount = image.length;
      if (imageCount < 10) {
        setImageCount(imageCount.toString().padStart(2, "0"));
      } else {
        setImageCount(imageCount.toString());
      }
    }
  }, [image]);

  return (
    <div className="flex w-full justify-between px-4">
      <div>
        <Button
          className="w-16 font-mono"
          variant="outline"
        >{`${imageCount}/10`}</Button>
      </div>
      <div className="flex items-center justify-between">
        <DeleteAlertDialog />
        <Separator className="m-2" orientation="vertical" />
        <ArcherElement id="upload">
          <div id="upload">
            <ImageUpload />
          </div>
        </ArcherElement>
      </div>
    </div>
  );
}
