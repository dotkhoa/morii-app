import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants, MotionButton } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import { deleteImage } from "@/lib/images";
import useImageStore from "@/store/imageStore";
import useSelectedStore from "@/store/selectedStore";
import { Trash2 } from "lucide-react";

export function DeleteAlertDialog() {
  const { user } = useAuth();
  const { setImage } = useImageStore();
  const { selectedIds, clearSelectedIds } = useSelectedStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MotionButton
          disabled={selectedIds.size === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
        >
          <Trash2 />
        </MotionButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the{" "}
            {selectedIds.size > 1 ? selectedIds.size : " "} selected image
            {selectedIds.size > 1 ? "s" : ""}?
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              deleteImage(
                user?.id,
                setImage,
                Array.from(selectedIds),
                clearSelectedIds,
              );
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
