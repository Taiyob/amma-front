import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {OngoingTab} from '../components/Tab/OngoingTab';
import {CompletedTab} from '../components/Tab/Completedtab';
import {ScheduledTab} from '../components/Tab/ScheduledTab';

export default function ActiveCasesTab() {
  return (
    <Tabs className="" defaultValue="tab-1">
      <TabsList>
        <TabsTrigger value="tab-1">Ongoing</TabsTrigger>
        <TabsTrigger value="tab-3">Scheduled</TabsTrigger>
        <TabsTrigger value="tab-2">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <OngoingTab />
      </TabsContent>
      <TabsContent value="tab-3">
        <ScheduledTab />
      </TabsContent>
      <TabsContent value="tab-2">
        <CompletedTab />
      </TabsContent>
    </Tabs>
  );
}
