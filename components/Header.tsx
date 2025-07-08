import { signOut } from "@/lib/auth";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const avatarImage = user?.user_metadata.avatar_url;
  const name = user?.user_metadata.name;
  const initials = name
    ?.split(" ")
    ?.map((word: any) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <header className="flex h-16 items-center justify-end gap-4 p-4">
      {loading ? (
        <></>
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={avatarImage} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onSelect={signOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
