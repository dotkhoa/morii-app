import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/authContext";
import { uploadImageEdge } from "@/lib/images";
import useImageStore from "@/store/imageStore";

export default function ImageUpload() {
  const { user } = useAuth();
  const { setImage } = useImageStore();
  return (
    <form onSubmit={(e) => uploadImageEdge(e, user?.id, setImage)}>
      <div className="flex">
        <Input id="picture" type="file" accept="image/*" name="image" />
        <Button className={"ml-2 hover:cursor-pointer"} type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}
