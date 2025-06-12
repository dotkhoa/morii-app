import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
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

  const signedUrlPromises = imagePaths.map((path) =>
    supabase.storage.from("images").getPublicUrl(path),
  );

  const signedUrlResults = await Promise.all(signedUrlPromises);

  const urls = signedUrlResults.map((results) => {
    return results.data.publicUrl;
  });
  return NextResponse.json({ urls });
}
