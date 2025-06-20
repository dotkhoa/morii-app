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
} from "@/components/ui/alertDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import { deleteImage } from "@/lib/images";
import useImageStore from "@/store/imageStore";
import useSelectedStore from "@/store/selectedStore";

export function DeleteAlertDialog() {
  const { user } = useAuth();
  const { setImage } = useImageStore();
  const { selectedIds, clearSelectedIds } = useSelectedStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={selectedIds.size === 0} variant={"destructive"}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            image(s).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteImage(
                user?.id,
                setImage,
                Array.from(selectedIds),
                clearSelectedIds,
              );
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
