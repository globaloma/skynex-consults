import { NextResponse } from "next/server";
import { createServiceRoleSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleSupabase();

    const fileExt = file.name.split(".").pop();
    const filePath = `uploads/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error } = await supabase.storage
      .from("uploads")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);

    return NextResponse.json({
      url: data.publicUrl,
    });
  } catch {
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}