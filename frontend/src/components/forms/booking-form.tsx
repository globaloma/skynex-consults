"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput } from "@/lib/validations/booking";
import { CONSULTATION_TYPES, SERVICE_OPTIONS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { FormSuccess } from "@/components/shared/form-success";
import { FormError } from "@/components/shared/form-error";
import { TurnstileWidget } from "@/components/shared/turnstile-widget";

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (values: BookingInput) => {
    try {
      setLoading(true);
      setSuccess("");
      setServerError("");

      if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
        throw new Error("Please complete spam verification.");
      }

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(
        "Your consultation request has been received. A confirmation email has been sent."
      );
      toast.success("Booking submitted successfully.");
      reset();
      setTurnstileToken("");

      if (data.redirectTo) {
        window.location.href = data.redirectTo;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to submit booking";
      setServerError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      {success ? (
        <FormSuccess title="Booking submitted" description={success} />
      ) : null}

      {serverError ? <FormError message={serverError} /> : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" error={errors.fullName?.message}>
          <Input placeholder="Your full name" {...register("fullName")} />
        </Field>

        <Field label="Email Address" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
        </Field>

        <Field label="Phone Number" error={errors.phone?.message}>
          <Input placeholder="+234..." {...register("phone")} />
        </Field>

        <Field label="Type of Consultation" error={errors.consultationType?.message}>
          <select
            className="flex h-11 w-full rounded-xl border border-borderSoft bg-white px-3 text-sm outline-none focus:border-brand-500"
            {...register("consultationType")}
          >
            <option value="">Select consultation type</option>
            {CONSULTATION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Service of Interest" error={errors.serviceInterest?.message}>
          <select
            className="flex h-11 w-full rounded-xl border border-borderSoft bg-white px-3 text-sm outline-none focus:border-brand-500"
            {...register("serviceInterest")}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Date" error={errors.preferredDate?.message}>
          <Input type="date" {...register("preferredDate")} />
        </Field>

        <Field label="Preferred Time" error={errors.preferredTime?.message}>
          <Input type="time" {...register("preferredTime")} />
        </Field>
      </div>

      <Field label="Additional Notes (Optional)" error={errors.additionalNotes?.message}>
        <Textarea
          placeholder="Tell us more about your business or what you would like support with."
          {...register("additionalNotes")}
        />
      </Field>

      <TurnstileWidget onVerify={setTurnstileToken} />

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Confirm Booking"}
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