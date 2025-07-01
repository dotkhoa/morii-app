import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/authContext";
import { uploadImageEdge } from "@/lib/images";
import useImageStore from "@/store/imageStore";
import { DeleteAlertDialog } from "./DeleteAlertDialog";

export default function ImageUpload() {
  const { user } = useAuth();
  const { image, setImage } = useImageStore();

  return (
    <div>
      <form onSubmit={(e) => uploadImageEdge(e, user?.id, image, setImage)}>
        <div className="flex">
          <Input id="picture" type="file" accept="image/*" name="image" />
          <Button className={"ml-2 hover:cursor-pointer"} type="submit">
            Add
          </Button>
        </div>
      </form>
      <div className="flex justify-center pt-4">
        <DeleteAlertDialog />
      </div>
    </div>
  );
}
