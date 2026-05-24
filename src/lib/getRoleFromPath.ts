import { UserRole } from "@/types";

export function getRoleFromPath(pathname: string): UserRole | null {
  console.log("Get role",pathname)
  if (pathname.startsWith("/admin")) return "ADMIN";
  if (pathname.startsWith("/patient")) return "PATIENT";
  if (pathname.startsWith("/staff")) return "STAFF";
  return null;
}
