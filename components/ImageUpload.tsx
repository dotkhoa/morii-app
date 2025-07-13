import { Upload } from "@/hooks/image-upload";
import useImageStore from "@/store/imageStore";
import { Plus } from "lucide-react";
import { useState } from "react";
import { MotionButton } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "./ui/dropzone";

export default function ImageUploaded() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { image } = useImageStore();

  const imageCount = image.length;

  const props = Upload({
    allowedMimeTypes: ["image/*"],
    maxFiles: 10 - imageCount,
    maxFileSize: 1000 * 1000 * 1, // 1MB,
    setIsOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <MotionButton
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
        >
          <Plus />
          Upload
        </MotionButton>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <Dropzone {...props} className="flex-1">
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </DialogContent>
    </Dialog>
  );
}
