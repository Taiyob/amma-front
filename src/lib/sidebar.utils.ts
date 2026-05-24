// lib/sidebar.utils.ts
import { SIDEBAR_CONFIG } from "@/Sidebar/sidebar.config";
import { UserRole } from "@/types";
import { SidebarSection, SidebarItem, } from "@/types/sidebar.types";

export function getSidebarItemsForRole(role: UserRole): SidebarItem[] {
  if (!role) return [];

  const allowedSections = SIDEBAR_CONFIG.filter(section =>
    section.roles.includes(role)
  );

  // Flatten all allowed items from matching sections
  const items = allowedSections.flatMap(section => section.items);

  // You can add extra dynamic items here if needed
  // if (role === "DOCTOR") {
  //   items.push(...await getDoctorDynamicItems());
  // }

  return items;
}