import { Upload } from "@/hooks/image-upload";
import useImageStore from "@/store/imageStore";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "./ui/dropzone";

export default function ImageUploaded() {
  const { image } = useImageStore();

  const imageCount = image.length;

  const props = Upload({
    allowedMimeTypes: ["image/*"],
    maxFiles: 10 - imageCount,
    maxFileSize: 1000 * 1000 * 1, // 1MB,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={"ml-2 hover:cursor-pointer"} type="submit">
          <Plus />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <Dropzone {...props}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </DialogContent>
    </Dialog>
  );
}
