import { createServerClient } from "@supabase/ssr";
import { checkBotId } from "botid/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  const verification = await checkBotId();

  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
  const verification = await checkBotId();

  if (verification.isBot) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  const { imagePaths } = await request.json();

  if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
    return new NextResponse("Image paths array is required", { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );

  const publicUrlPromises = imagePaths.map((path) =>
    supabase.storage.from("images").getPublicUrl(path),
  );

  const publicUrlResults = await Promise.all(publicUrlPromises);

  const urls = publicUrlResults.map((results) => {
    return results.data.publicUrl;
  });
  return NextResponse.json({ urls });
}
