import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImageEdge } from "@/lib/images";

export default function ImageUpload() {
  return (
    <form onSubmit={(e) => uploadImageEdge(e)}>
      <Input id="picture" type="file" name="image" />
      <Button className={"hover:cursor-pointer"} type="submit">
        Add
      </Button>
    </form>
  );
}
