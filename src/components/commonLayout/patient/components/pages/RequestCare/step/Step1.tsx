'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UrgentCareCard } from '../../../card/UrgentCareCard';
import { ServiceCard } from '../../../function/funtion.card';
// import {additionalServices} from '@/types/data';
import { useRequestCare } from '@/context/RequestCareContext';
import { useGetAllServiceQuery } from '@/redux/api/services.api';
import { Service } from '@/types';

export const Step1 = () => {
  const {
    selectedPackage,
    selectedExtras,
    isUrgent,
    toggleExtra,
    setSelectedPackage,
  } = useRequestCare();

  const { data, isLoading } = useGetAllServiceQuery({});

  console.log(isLoading, data?.data);

  const carePackages: Service[] = data?.data?.filter(
    (care: Service) => care.category === 'PACKAGE',
  );
  const careService: Service[] = data?.data?.filter(
    (care: Service) => care.category === 'SERVICE',
  );

  console.log(careService);

  return (
    <div className="space-y-8 sm:space-y-10">
      <Tabs defaultValue="packages" className="w-full">
        <TabsList className="grid w-full max-w-sm mx-auto grid-cols-2">
          <TabsTrigger value="packages">Care Packages</TabsTrigger>
          <TabsTrigger value="services">Specific Services</TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="mt-6 sm:mt-8">
          {/* Packages grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {carePackages?.map((pkg: Service) => (
              <ServiceCard
                key={pkg.id}
                name={pkg.name}
                price={pkg?.basePrice}
                desc={pkg.description}
                selected={selectedPackage === pkg.name}
                onClick={() =>
                  setSelectedPackage(pkg.id, pkg.name, pkg.basePrice)
                }
              />
            ))}
          </div>

          {isUrgent && (
            <div className="mt-8">
              <UrgentCareCard />
            </div>
          )}

          <h3 className="text-lg sm:text-xl font-semibold mt-8 sm:mt-10 mb-4 sm:mb-5">
            Additional Services
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {careService?.map((s: Service) => (
              <ServiceCard
                key={s.id}
                name={s.name}
                price={s.basePrice}
                selected={selectedExtras.some((e) => e.id === s.id)}
                onClick={() => toggleExtra(s.id, s.name, s.basePrice)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-6 sm:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {careService?.map((s) => (
              <ServiceCard
                key={s.id}
                name={s.name}
                price={s.basePrice}
                selected={selectedExtras.some((e) => e.id === s.id)}
                onClick={() => toggleExtra(s.id, s.name, s.basePrice)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
