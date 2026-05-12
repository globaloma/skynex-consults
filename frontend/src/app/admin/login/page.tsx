// src/app/admin/login/page.tsx
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-50/30 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <h1 className="font-heading text-3xl font-semibold text-text-primary">
                Admin Login
              </h1>
              <p className="mt-2 text-sm text-text-muted">
                Sign in to manage bookings and content.
              </p>
            </div>

            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}