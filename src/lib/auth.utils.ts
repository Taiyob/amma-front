import { UserRole } from "@/types";

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "PATIENT") {
        return "/dashboard";
    }
    return "/";
}