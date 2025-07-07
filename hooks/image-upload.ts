import { supabase } from "@/lib/auth";
import { useAuth } from "@/lib/authContext";
import { fetchImages } from "@/lib/images";
import useImageStore from "@/store/imageStore";
import { useCallback, useEffect, useState } from "react";
import {
  type FileError,
  type FileRejection,
  useDropzone,
} from "react-dropzone";
import { toast } from "sonner";

interface FileWithPreview extends File {
  preview?: string;
  errors: readonly FileError[];
}

type UploadOptions = {
  allowedMimeTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

type UploadReturn = ReturnType<typeof Upload>;

const Upload = (options: UploadOptions) => {
  const {
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    setIsOpen,
  } = options;

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);

  const { user } = useAuth();
  const { setImage } = useImageStore();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const validFiles = acceptedFiles
        .filter((file) => !files.find((x) => x.name === file.name))
        .map((file) => {
          (file as FileWithPreview).preview = URL.createObjectURL(file);
          (file as FileWithPreview).errors = [];
          return file as FileWithPreview;
        });

      const invalidFiles = fileRejections.map(({ file, errors }) => {
        (file as FileWithPreview).preview = URL.createObjectURL(file);
        (file as FileWithPreview).errors = errors;
        return file as FileWithPreview;
      });

      const newFiles = [...files, ...validFiles, ...invalidFiles];

      setFiles(newFiles);
    },
    [files, setFiles],
  );

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce(
      (acc, type) => ({ ...acc, [type]: [] }),
      {},
    ),
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  });

  const onUpload = useCallback(async () => {
    setLoading(true);

    // [Joshen] This is to support handling partial successes
    // If any files didn't upload for any reason, hitting "Upload" again will only upload the files that had errors
    const filesWithErrors = errors.map((x) => x.name);
    const filesToUpload =
      filesWithErrors.length > 0
        ? [...files.filter((f) => filesWithErrors.includes(f.name))]
        : files;

    const responses = await Promise.all(
      filesToUpload.map(async (file) => {
        const clientFormData = new FormData();

        clientFormData.append("file", file);

        const { data } = await supabase.functions.invoke("upload-image", {
          body: clientFormData,
        });

        if (data.message) {
          return { name: file.name, message: data.message };
        } else {
          return { name: file.name, message: undefined };
        }
      }),
    );

    const responseErrors = responses.filter((x) => x.message !== undefined);
    // if there were errors previously, this function tried to upload the files again so we should clear/overwrite the existing errors.
    setErrors(responseErrors);

    const responseSuccesses = responses.filter((x) => x.message === undefined);
    responseSuccesses.map((x) =>
      toast.success(`${x.name} uploaded successfully.`),
    );
    const newFiles = files.filter(
      (x) => !responseSuccesses.map((s) => s.name).includes(x.name),
    );

    if (responseErrors.length === 0) {
      setIsOpen?.(false);
    }

    setFiles(newFiles);

    const images = await fetchImages(user?.id);
    setImage(images || []);

    setLoading(false);
  }, [files, errors]);

  useEffect(() => {
    if (files.length === 0) {
      setErrors([]);
    }

    // If the number of files doesn't exceed the maxFiles parameter, remove the error 'Too many files' from each file
    if (files.length <= maxFiles) {
      let changed = false;
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === "too-many-files")) {
          file.errors = file.errors.filter((e) => e.code !== "too-many-files");
          changed = true;
        }
        return file;
      });
      if (changed) {
        setFiles(newFiles);
      }
    }
  }, [files.length, setFiles, maxFiles]);

  return {
    files,
    setFiles,
    loading,
    errors,
    setErrors,
    onUpload,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  };
};

export { Upload, type UploadOptions, type UploadReturn };
