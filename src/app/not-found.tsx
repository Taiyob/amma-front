import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Page not found
      </p>

      <Link href="/login" className="mt-6">
        <Button>Go to Login</Button>
      </Link>
    </div>
  );
}
