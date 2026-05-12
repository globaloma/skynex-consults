"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerSupabase, createServiceRoleSupabase } from "@/lib/supabase/server";
import { resend } from "@/lib/resend";
import { bookingStatusUpdatedTemplate } from "@/lib/resend/status-template";
import type { Database } from "@/types/supabase";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/admin");
}

export async function logoutAdmin() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateBookingStatus(formData: FormData) {
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  if (!id || !status) {
    return { error: "Missing booking ID or status" };
  }

  const supabase = createServiceRoleSupabase();

  const { data, error: fetchError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !data) {
    return { error: fetchError?.message || "Booking not found" };
  }

  const booking = data as Booking;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from("bookings") as any)
    .update({ status })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  const from =
    process.env.RESEND_FROM_EMAIL || "Skynex Consults <onboarding@resend.dev>";

  await Promise.allSettled([
    resend.emails.send({
      from,
      to: booking.email,
      subject: "Your consultation request status has been updated",
      html: bookingStatusUpdatedTemplate({
        fullName: booking.full_name,
        status,
      }),
    }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/admin/bookings");

  return { success: true };
}