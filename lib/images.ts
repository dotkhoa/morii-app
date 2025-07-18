import type { Images } from "@/store/imageStore";
import { cache } from "react";
import { toast } from "sonner";
import { supabase } from "./auth";

export async function fetchImages(userId: string | undefined) {
  const images = await loadImageList(userId);
  const imageUrl = await getPublicImageUrls(images);

  const mergedImage = images?.map((img, i) => ({
    id: img.id,
    path: img.file_path,
    url: imageUrl[i],
  }));

  if (mergedImage) {
    localStorage.setItem("hasImages", JSON.stringify(mergedImage.length > 0));
  }

  return mergedImage;
}

export async function loadImageList(userId: string | void) {
  const { data, error } = await supabase
    .from("images")
    .select("file_path, id")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
  } else {
    return data;
  }
}

interface FileObject {
  file_path: string;
  id: string;
}

export const getPublicImageUrls = cache(
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

export async function deleteImage(
  userId: string | undefined,
  setImage: (image: Images[]) => void,
  images: Images[],
  clearSelectedIds: () => void,
) {
  const imageCount = images.length;

  const storageResults = await Promise.all(
    images.map((img) =>
      supabase.storage
        .from("images")
        .remove([img.path])
        .then((r) => ({ id: img.id, ...r })),
    ),
  );

  const badStorage = storageResults.find((r) => r.error);
  if (badStorage) {
    console.error("Storage delete failed for", badStorage.id, badStorage.error);
    return;
  }

  const dbResults = Promise.all(
    images.map((img) =>
      supabase
        .from("images")
        .delete()
        .eq("id", img.id)
        .then((r) => ({ id: img.id, ...r })),
    ),
  );

  const badDb = (await dbResults).find((r) => r.error);
  if (badDb) {
    console.error("DB delete failed for", badDb.id, badDb.error);
    return;
  }
  if (images.length < 1) {
    localStorage.setItem("hasImages", "false");
  }
  toast.success(
    `${imageCount > 1 ? imageCount : ""} Image${imageCount > 1 ? "s" : ""} deleted successfully.`,
  );
  const refreshed = await fetchImages(userId);
  setImage(refreshed || []);
  clearSelectedIds();
}
