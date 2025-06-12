import { cache } from "react";
import { toast } from "sonner";
import { supabase } from "./auth";

export async function uploadImageEdge(
  e: React.FormEvent<HTMLFormElement>,
  userId: string | undefined,
  setImage: (image: string[]) => void,
) {
  e.preventDefault();

  const MAX_BYTES = 1 * 1024 * 1024;

  const fileInput = e.currentTarget.elements.namedItem(
    "image",
  ) as HTMLInputElement;

  if (!fileInput.files || fileInput.files.length === 0) {
    toast.warning("No image selected");
    return;
  }

  const file = fileInput.files[0];

  if (file.size > MAX_BYTES) {
    toast.warning("Image is larger than 1 MB");
    return;
  }

  if (file) {
    const clientFormData = new FormData();

    clientFormData.append("file", file);

    const uploadPromise = supabase.functions
      .invoke("upload-image", {
        body: clientFormData,
      })
      .then((res) => {
        if (res.data.message) {
          throw new Error(res.data.message);
        }
        return res.data;
      });

    toast.promise(uploadPromise, {
      loading: "Uploading...",
      success: () => {
        return `Image upload successful!`;
      },
      error: (err) => err.message,
    });

    const { data } = await uploadPromise;

    if (data.message) {
      return;
    } else {
      const images = await fetchImages(userId);
      setImage(images || []);
    }
  }
}

export async function fetchImages(userId: string | undefined) {
  const images = await loadImageList(userId);
  const imageUrl = await getSignegImageUrls(images);
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

interface FileObject {
  file_path: string;
}

export const getSignegImageUrls = cache(
  async (images: FileObject[] | undefined) => {
    if (!images || images.length === 0) {
      return [];
    }

    const imagePaths = images.map((image) => image.file_path);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/image-urls`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePaths }),
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get signed URLs");
    }

    const { urls } = await response.json();
    return urls as string[];
  },
);
