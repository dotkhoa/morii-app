import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export async function uploadImage(
  e: React.FormEvent<HTMLFormElement>,
  client: any,
  userId?: string,
) {
  e.preventDefault();

  const fileInput = e.currentTarget.elements.namedItem(
    "image",
  ) as HTMLInputElement;

  if (!fileInput.files || fileInput.files.length === 0) {
    console.error("No file selected");
    return;
  }

  const file = fileInput.files[0];

  const filePath = `images/${crypto.randomUUID()}-${file.name}`;

  const { error } = await client.storage.from("images").upload(filePath, file);

  if (error) {
    toast.error("Image has failed uploading.");
  } else {
    const { error } = await client
      .from("images")
      .insert({ user_id: userId, file_path: filePath });
    if (error) {
      console.error(error);
      return;
    }
    toast.success("Image has successfully uploaded.");
    window.location.reload();
  }
}

export async function loadImageList(client: any, userId: string | void) {
  const { data, error } = await client
    .from("images")
    .select("file_path")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
}

type FileObject = {
  file_path: string;
};

export async function getImageUrl(
  images: FileObject[],
  client: any,
  setImages: Dispatch<SetStateAction<string[]>>,
) {
  const imageUrl = [];

  for (let i = 0; i < images.length; i++) {
    const { error, data } = await client.storage
      .from("images")
      .createSignedUrl(images[i]?.file_path, 60);

    if (error) {
      console.error(error);
      return;
    } else {
      imageUrl.push(data?.signedUrl.toString());
    }
  }

  setImages(imageUrl);
}
