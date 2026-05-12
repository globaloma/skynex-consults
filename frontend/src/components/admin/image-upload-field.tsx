"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "@/components/ui/sonner";

export function ImageUploadField({
  name,
  defaultValue,
  label,
}: {
  name: string;
  defaultValue?: string | null;
  label: string;
}) {
  const [value, setValue] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setValue(data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid gap-3">
      <label className="text-sm font-medium text-text-primary">{label}</label>
      <input type="hidden" name={name} value={value} />

      {value ? (
        <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-borderSoft">
          <Image src={value} alt={label} fill className="object-cover" />
        </div>
      ) : null}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
        className="block text-sm text-text-body"
      />

      {uploading ? <p className="text-xs text-text-muted">Uploading...</p> : null}
      {value ? <p className="break-all text-xs text-text-muted">{value}</p> : null}
    </div>
  );
}