import { LucideIcon } from "lucide-react";
import { UserRole } from ".";

export interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface SidebarSection {
  title?: string;
  roles: UserRole[];          // ⭐ KEY PART
  items: SidebarItem[];
}
