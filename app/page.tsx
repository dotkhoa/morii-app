"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  const { user } = useUser();
  const { session } = useSession();

  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null;
        },
      },
    );
  }

  const client = createClerkSupabaseClient();

  useEffect(() => {
    if (!user) return;

    async function loadTasks() {
      setLoading(true);
      const { data, error } = await client.from("tasks").select();
      if (!error) setTasks(data);
      setLoading(false);
    }

    loadTasks();
  }, [user]);

  async function createTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await client.from("tasks").insert({
      name,
    });
    window.location.reload();
  }

  async function deleteTask(task: number) {
    await client.from("tasks").delete().eq("id", task);
    window.location.reload();
  }

  return (
    <div>
      <header className="flex h-16 items-center justify-end gap-4 p-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-8 px-4 text-xl">
        <div> Hello World </div>

        <h1>Tasks</h1>

        {loading && <p>Loading...</p>}

        {!loading &&
          tasks.length > 0 &&
          tasks.map((task: any) => (
            <p key={task.id}>
              {task.name}
              <button
                onClick={() => deleteTask(task.id)}
                className={"ml-10 hover:cursor-pointer"}
              >
                ❌
              </button>
            </p>
          ))}

        {!loading && tasks.length === 0 && <p>No tasks found</p>}

        <form onSubmit={createTask}>
          <input
            autoFocus
            type="text"
            name="name"
            placeholder="Enter new task"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button className={"hover:cursor-pointer"} type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
