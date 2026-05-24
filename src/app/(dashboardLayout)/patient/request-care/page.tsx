import ClientContent from '@/components/commonLayout/patient/components/pages/RequestCare/ClientContent';
import {RequestCareProvider} from '@/context/RequestCareContext';

// This is the server component
export default function RequestCareServicePage() {
  return (
    <RequestCareProvider>
      <ClientContent />
    </RequestCareProvider>
  );
}
