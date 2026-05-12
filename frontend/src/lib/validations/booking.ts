import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Phone number is required"),
  consultationType: z.string().min(1, "Select a consultation type"),
  serviceInterest: z.string().min(1, "Select a service"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  additionalNotes: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;