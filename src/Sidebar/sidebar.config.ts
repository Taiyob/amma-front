import { SidebarSection } from '@/types/sidebar.types';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Pill,
  Activity,
  FileText,
  User,
  Contact,
  BanknoteArrowUp,
  MessageCircle,
  CircleCheckBig,
  UserCog,
  UsersRound,
  Folder,
  Layers,
  Bell,
} from 'lucide-react';

export const SIDEBAR_CONFIG: SidebarSection[] = [
  {
    title: 'Admin Panel',
    roles: ['ADMIN'],
    items: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: LayoutDashboard,
      },
      // {
      //   title: 'Notifications',
      //   url: '/notifications',
      //   icon: Bell,
      // },
      {
        title: 'Pending requests',
        url: '/admin/pending-requests',
        icon: Users,
      },
      {
        title: 'Active Cases',
        url: '/admin/active-cases',
        icon: CreditCard,
      },
      {
        title: 'User List',
        url: '/admin/user-list',
        icon: UserCog,
      },
      {
        title: 'Staff management',
        url: '/admin/staff-management',
        icon: UsersRound,
      },
      {
        title: 'Teams',
        url: '/admin/teams',
        icon: Users,
      },
      {
        title: 'Reporting & Logs',
        url: '/admin/reporting-logs',
        icon: FileText,
      },
      {
        title: 'Patient Management',
        url: '/admin/patient-management',
        icon: Folder,
      },
      {
        title: 'Service Management',
        url: '/admin/service',
        icon: Layers,
      },
      {
        title: 'Plans Management',
        url: '/admin/plans',
        icon: FileText,
      },
      {
        title: 'Transactions',
        url: '/admin/transactions',
        icon: CreditCard,
      },
      {
        title: 'Support',
        url: '/admin/support',
        icon: MessageCircle,
      },
    ],
  },
  {
    title: 'Patient Panel',
    roles: ['PATIENT'],
    items: [
      {
        title: 'Dashboard',
        url: '/patient/dashboard',
        icon: LayoutDashboard,
      },
      // {
      //   title: 'Notifications',
      //   url: '/notifications',
      //   icon: Bell,
      // },
      {
        title: 'Patient Profile',
        url: '/patient/profile',
        icon: User,
      },
      {
        title: 'Request Care',
        url: '/patient/request-care',
        icon: Contact,
      },
      // {
      //   title: 'My Subscription',
      //   url: '/patient/subscriptions',
      //   icon: CreditCard,
      // },
      {
        title: 'Medications',
        url: '/patient/medications',
        icon: Pill,
      },
      {
        title: 'Medical Records',
        url: '/patient/medical-records',
        icon: Activity,
      },
      {
        title: 'Health Insights',
        url: '/patient/health-insights',
        icon: FileText,
      },
      {
        title: 'Billing & Payments',
        url: '/patient/billing-payments',
        icon: BanknoteArrowUp,
      },
      {
        title: 'Help',
        url: '/patient/help',
        icon: MessageCircle,
      },
    ],
  },
  {
    title: 'Staff Panel',
    roles: ['STAFF'],
    items: [
      {
        title: 'Dashboard',
        url: '/staff/dashboard',
        icon: LayoutDashboard,
      },
      // {
      //   title: 'Notifications',
      //   url: '/notifications',
      //   icon: Bell,
      // },
      {
        title: 'My Assignments',
        url: '/staff/my-assignments',
        icon: CircleCheckBig,
      },
    ],
  },
];
