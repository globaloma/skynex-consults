"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { FormSuccess } from "@/components/shared/form-success";
import { FormError } from "@/components/shared/form-error";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      setLoading(true);
      setSuccess("");
      setServerError("");

      if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
        throw new Error("Please complete spam verification.");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(
        "Your message has been sent successfully. Our team will get back to you soon."
      );
      toast.success("Message sent successfully.");
      reset();
      setTurnstileToken("");

      if (data.redirectTo) {
        window.location.href = data.redirectTo;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send message";
      setServerError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      {success ? (
        <FormSuccess title="Message sent" description={success} />
      ) : null}

      {serverError ? <FormError message={serverError} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <Input placeholder="Your name" {...register("name")} />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
        </Field>
      </div>

      <Field label="Phone (Optional)" error={errors.phone?.message}>
        <Input placeholder="+234..." {...register("phone")} />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <Textarea placeholder="How can we help you?" {...register("message")} />
      </Field>

      <TurnstileWidget onVerify={setTurnstileToken} />

      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}