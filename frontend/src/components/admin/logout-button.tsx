import { logoutAdmin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <Button type="submit" variant="secondary">
        Logout
      </Button>
    </form>
  );
}