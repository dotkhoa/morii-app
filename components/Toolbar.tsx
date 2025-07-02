import { Button } from "@/components/ui/button";
import useImageStore from "@/store/imageStore";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import ImageUpload from "./ImageUpload";
import { Separator } from "./ui/separator";

export default function Toolbar() {
  const { image } = useImageStore();

  const imageCount = image.length;

  return (
    <div className="flex w-full justify-between px-4">
      <div>
        <Button className="w-16" variant="outline">{`${imageCount}/10`}</Button>
      </div>
      <div className="flex items-center justify-between">
        <DeleteAlertDialog />
        <Separator className="m-2" orientation="vertical" />
        <ImageUpload />
      </div>
    </div>
  );
}
