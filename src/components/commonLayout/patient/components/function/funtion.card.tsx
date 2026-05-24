// components/commonLayout/patient/components/function/funtion.card.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  name: string;
  price: number;
  desc?: string;
  selected: boolean;
  onClick: () => void;
}

export function ServiceCard({ name, price, desc, selected, onClick }: ServiceCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:border-secondary hover:shadow-md',
        selected && 'border-2 border-secondary bg-secondary/5 shadow-sm'
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex justify-between gap-4">
          <div>
            <h4 className="font-medium">{name}</h4>
            {desc && <p className="text-sm text-muted-foreground mt-1">{desc}</p>}
          </div>
          <div className="font-semibold text-lg whitespace-nowrap">${price}</div>
        </div>
      </CardContent>
    </Card>
  );
}