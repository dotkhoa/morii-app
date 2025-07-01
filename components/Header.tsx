import { signOut } from "@/lib/auth";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  return (
    <header className="flex h-16 items-center justify-end gap-4 p-4">
      {loading ? (
        <></>
      ) : user ? (
        <Button className={"hover:cursor-pointer"} onClick={signOut}>
          {"Sign-Out"}
        </Button>
      ) : (
        <div>
          <Button
            className={"hover:cursor-pointer"}
            onClick={() => router.push("/login")}
          >
            {"Sign-In"}
          </Button>
        </div>
      )}
    </header>
  );
}
