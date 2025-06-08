import { toast } from "sonner";
import { supabase } from "./auth";

export async function uploadImageEdge(
  e: React.FormEvent<HTMLFormElement>,
  userId: string | undefined,
  setImage: (image: string[]) => void,
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

  if (file) {
    const clientFormData = new FormData();

    clientFormData.append("file", file);

    const { data, error } = await supabase.functions.invoke("upload-image", {
      body: clientFormData,
    });

    if (data.message) {
      toast.error(data.message);
    } else {
      toast.success("Image upload successful!");
      const images = await fetchImages(userId);
      setImage(images || []);
    }

    if (error) {
      toast.error(error);
    }
  }
}

export async function fetchImages(userId: string | undefined) {
  const images = await loadImageList(userId);
  const imageUrl = await getImageUrl(images);
  return imageUrl;
}

export async function loadImageList(userId: string | void) {
  const { data, error } = await supabase
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

export async function getImageUrl(images: FileObject[] | undefined) {
  const imageUrl = [];

  if (images) {
    for (let i = 0; i < images.length; i++) {
      const { error, data } = await supabase.storage
        .from("images")
        .createSignedUrl(images[i]?.file_path, 60);

      if (error) {
        console.error(error);
        return;
      } else {
        imageUrl.push(data?.signedUrl.toString());
      }
    }
  }

  return imageUrl;
}
