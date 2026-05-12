import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, "")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-soft transition hover:bg-brand-700"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}