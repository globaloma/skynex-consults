import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validations/booking";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { resend } from "@/lib/resend";
import {
  adminBookingNotificationTemplate,
  bookingConfirmationTemplate,
} from "@/lib/resend/templates";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { createCalendarEvent } from "@/lib/google-calendar";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid booking data", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const spamCheck = await verifyTurnstileToken(body.turnstileToken);
    if (!spamCheck) {
      return NextResponse.json(
        { message: "Spam verification failed" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleSupabase();

    const { data: inserted, error } = await supabase
      .from("bookings")
      .insert({
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        consultation_type: parsed.data.consultationType,
        service_interest: parsed.data.serviceInterest,
        preferred_date: parsed.data.preferredDate,
        preferred_time: parsed.data.preferredTime,
        additional_notes: parsed.data.additionalNotes || null,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const adminEmail =
      process.env.BOOKING_ADMIN_EMAIL || "info@skynexconsult.com";
    const from =
      process.env.RESEND_FROM_EMAIL ||
      "Skynex Consults <onboarding@resend.dev>";

    await Promise.allSettled([
      resend.emails.send({
        from,
        to: parsed.data.email,
        subject: "Your consultation request with Skynex Consults",
        html: bookingConfirmationTemplate(parsed.data),
      }),
      resend.emails.send({
        from,
        to: adminEmail,
        subject: "New consultation booking received",
        html: adminBookingNotificationTemplate({
          ...parsed.data,
          email: parsed.data.email,
          phone: parsed.data.phone,
        }),
      }),
      createCalendarEvent(parsed.data),
    ]);

    return NextResponse.json({
      message: "Booking submitted successfully",
      redirectTo: `/booking/success?id=${inserted.id}`,
    });
  } catch {
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}