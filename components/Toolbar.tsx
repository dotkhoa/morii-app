import { Button } from "@/components/ui/button";
import useImageStore from "@/store/imageStore";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";
import { ArcherElement } from "react-archer";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import ImageUpload from "./ImageUpload";
import { Separator } from "./ui/separator";

export default function Toolbar() {
  const { image } = useImageStore();

  const imageCount = useMemo(() => {
    if (image.length === 0) {
      return "00";
    } else if (image.length < 10) {
      return image.length.toString().padStart(2, "0");
    } else {
      return image.length.toString();
    }
  }, [image]);

  return (
    <div className="flex w-full justify-between px-4">
      <div>
        {image.length >= 1 ? (
          <Button className="w-16 overflow-hidden font-mono" variant="counter">
            <AnimatePresence mode="wait">
              <motion.div
                key={imageCount}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{
                  duration: 0.2,
                }}
              >
                {imageCount}
              </motion.div>
            </AnimatePresence>
            <div>/10</div>
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center justify-between">
        {image.length >= 1 ? (
          <div className="flex h-full items-center justify-between">
            <DeleteAlertDialog />
            <Separator className="m-2" orientation="vertical" />
            <div />
          </div>
        ) : (
          <></>
        )}
        <ArcherElement id="upload">
          <div id="upload">
            <ImageUpload />
          </div>
        </ArcherElement>
      </div>
    </div>
  );
}
