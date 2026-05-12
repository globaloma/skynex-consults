import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { createServiceRoleSupabase } from "@/lib/supabase/server";
import { resend } from "@/lib/resend";
import {
  adminContactNotificationTemplate,
  contactConfirmationTemplate,
} from "@/lib/resend/templates";
import { verifyTurnstileToken } from "@/lib/turnstile";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid contact data", errors: parsed.error.flatten() },
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

    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const adminEmail =
      process.env.CONTACT_ADMIN_EMAIL || "info@skynexconsult.com";
    const from =
      process.env.RESEND_FROM_EMAIL ||
      "Skynex Consults <onboarding@resend.dev>";

    await Promise.allSettled([
      resend.emails.send({
        from,
        to: parsed.data.email,
        subject: "We received your message",
        html: contactConfirmationTemplate(parsed.data),
      }),
      resend.emails.send({
        from,
        to: adminEmail,
        subject: "New contact form submission",
        html: adminContactNotificationTemplate(parsed.data),
      }),
    ]);

    return NextResponse.json({
      message: "Message sent successfully",
      redirectTo: "/contact/success",
    });
  } catch {
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}