import { signInWithGoogle, signOut } from "@/lib/auth";
import { useAuth } from "@/lib/authContext";
import { Button } from "./ui/button";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="flex h-16 items-center justify-end gap-4 p-4">
      {user ? (
        <Button className={"hover:cursor-pointer"} onClick={signOut}>
          {"Sign-Out"}
        </Button>
      ) : (
        <Button className={"hover:cursor-pointer"} onClick={signInWithGoogle}>
          {"Sign-In"}
        </Button>
      )}
    </header>
  );
}
