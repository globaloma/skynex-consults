// src/components/admin/login-form.tsx
"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginAdmin(formData);
    if (result?.error) {
      setError(result.error);
    }
    setLoading(false);
  }

  return (
    <form action={handleSubmit} className="grid gap-5">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="grid gap-2">
        <label className="text-sm font-medium text-text-primary">Email</label>
        <Input name="email" type="email" required />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-text-primary">Password</label>
        <Input name="password" type="password" required />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}