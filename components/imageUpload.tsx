import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/images";

interface Props {
  client: any;
  userId?: string;
}

export default function ImageUpload({ client, userId }: Props) {
  return (
    <form onSubmit={(e) => uploadImage(e, client, userId)}>
      <Input id="picture" type="file" name="image" />
      <Button className={"hover:cursor-pointer"} type="submit">
        Add
      </Button>
    </form>
  );
}
