export interface Service {
  id: string;
  name: string;
  code: string | null;
  type: string;
  category: 'SERVICE' | 'PACKAGE';
  description: string;
  imageUrl: string | null;
  icon: string | null;
  durationMinutes: number | null;
  basePrice: number;
  isActive: boolean;
  priority: string;
  createdAt: string;
  updatedAt: string;
}
