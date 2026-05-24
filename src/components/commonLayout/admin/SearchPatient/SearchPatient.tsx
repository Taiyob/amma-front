import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useState, useEffect} from 'react';

interface SearchPatientProps {
  onSearch: (value: string) => void;
  totalPatients?: number;
}

const SearchPatient = ({onSearch, totalPatients}: SearchPatientProps) => {
  const [query, setQuery] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <Card className="space-y-2 p-6">
      <Input
        placeholder="Search by Name, Patient ID, or Phone Number..."
        className="h-11"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {totalPatients !== undefined && (
        <Label className="text-muted-foreground">
          {totalPatients} patient{totalPatients !== 1 && 's'} found
        </Label>
      )}
    </Card>
  );
};

export default SearchPatient;
