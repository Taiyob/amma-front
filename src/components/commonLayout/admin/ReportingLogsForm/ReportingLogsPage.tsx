/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useMemo, useState} from 'react';
import {useGetAllLogQuery} from '@/redux/api/log';
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  ChevronDown,
} from 'lucide-react';

/* ─────────────────────────────────────────────
  STATUS (simple + human friendly)
───────────────────────────────────────────── */
const getStatus = (code: number) => {
  if (code >= 200 && code < 300) {
    return {
      label: 'Success',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      icon: CheckCircle2,
    };
  }

  if (code >= 400 && code < 500) {
    return {
      label: 'Failed',
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
      icon: XCircle,
    };
  }

  return {
    label: 'Error',
    color: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-500/10',
    icon: XCircle,
  };
};

/* ─────────────────────────────────────────────
   DATE FORMAT
───────────────────────────────────────────── */
const formatDate = (date: string) =>
  new Date(date).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ReportingLogsPage() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const queryParams = useMemo(() => ({search: search || undefined}), [search]);

  const {data, isLoading} = useGetAllLogQuery(queryParams);

  const logs = data?.data?.logs || [];

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-6 sm:px-6">
      {/* ── HEADER ───────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Activity Logs</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Simple activity overview for easy understanding
        </p>
      </div>

      {/* ── SEARCH ───────────────────────────── */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user or description..."
          className="
            w-full pl-9 pr-3 py-2
            rounded-lg
            border border-border
            bg-card
            text-sm
            outline-none
            focus:ring-2 focus:ring-secondary/30
          "
        />
      </div>

      {/* ── LIST ───────────────────────────── */}
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading logs...</p>
        ) : (
          logs.map((log: any) => {
            const status = getStatus(log.statusCode);
            const isOpen = expanded === log.id;
            const StatusIcon = status.icon;

            const userName =
              `${log?.user?.firstName} ${log?.user?.lastName}` ||
              log.userName ||
              'Guest';

            return (
              <div
                key={log.id}
                className="
                  bg-card
                  border border-border
                  rounded-xl
                  p-4
                  transition
                ">
                {/* ── MAIN ROW ───────────────── */}
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => setExpanded(isOpen ? null : log.id)}>
                  {/* LEFT SIDE */}
                  <div className="flex gap-3">
                    {/* avatar */}
                    <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-secondary" />
                    </div>

                    {/* content */}
                    <div>
                      <p className="text-sm font-medium">{userName}</p>

                      <p className="text-xs text-muted-foreground mt-0.5">
                        {log.description}
                      </p>

                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(log.createdAt)}
                        </span>

                        <span
                          className={`
                            flex items-center gap-1 px-2 py-0.5 rounded-md
                            text-xs font-medium
                            ${status.bg} ${status.color}
                          `}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <ChevronDown
                    className={`
                      h-4 w-4 text-muted-foreground
                      transition-transform
                      ${isOpen ? 'rotate-180' : ''}
                    `}
                  />
                </div>

                {/* ── EXPANDED ───────────────── */}
                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground space-y-1">
                    <p>
                      <span className="text-foreground">Email:</span>{' '}
                      {log.user?.email || '—'}
                    </p>

                    <p>
                      <span className="text-foreground">Path:</span> {log.path}
                    </p>

                    <p>
                      <span className="text-foreground">Status Code:</span>{' '}
                      {log.statusCode}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { useState, useMemo } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { SearchIcon, CalendarIcon, Loader2 } from 'lucide-react';
// import { useGetAllLogQuery } from '@/redux/api/log';

// const ReportingLogsPage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [startDate, setStartDate] = useState<string | undefined>();
//   const [endDate, setEndDate] = useState<string | undefined>();

//   const queryParams = useMemo(
//     () => ({
//       search: searchQuery || undefined,
//       startDate,
//       endDate,
//     }),
//     [searchQuery, startDate, endDate],
//   );

//   const { data, isLoading, isFetching } = useGetAllLogQuery(queryParams);

//   const logs = data?.data?.logs || [];

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);

//     return date.toLocaleString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       day: '2-digit',
//       month: 'short',
//     });
//   };

//   const handleTodayFilter = () => {
//     const today = new Date();

//     const start = new Date(today);
//     start.setHours(0, 0, 0, 0);

//     const end = new Date(today);
//     end.setHours(23, 59, 59, 999);

//     setStartDate(start.toISOString());
//     setEndDate(end.toISOString());
//   };

//   return (
//     <div className="p-6 bg-background min-h-screen">

//       {/* FILTER BAR */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

//         <div className="relative w-full md:max-w-md">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

//           <Input
//             placeholder="Search user, endpoint, action..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         <Button
//           variant="outline"
//           onClick={handleTodayFilter}
//           className="flex items-center gap-2"
//         >
//           <CalendarIcon className="h-4 w-4" />
//           Today
//         </Button>

//       </div>

//       {/* TERMINAL STYLE LOG */}
//       <div className="bg-black text-green-400 font-mono rounded-xl p-4 shadow-lg">

//         {isLoading || isFetching ? (
//           <div className="flex justify-center py-10">
//             <Loader2 className="animate-spin" />
//           </div>
//         ) : logs.length === 0 ? (
//           <div className="text-center text-gray-400 py-10">
//             No activity logs found
//           </div>
//         ) : (
//           <div className="space-y-4">

//             {logs.map((log: any) => {

//               const userName = log.user
//                 ? `${log.user.firstName} ${log.user.lastName}`
//                 : log.userName || 'Guest';

//               const success = log.statusCode >= 200 && log.statusCode < 300;

//               return (
//                 <div
//                   key={log.id}
//                   className="border-b border-gray-700 pb-3"
//                 >

//                   {/* LINE 1 */}
//                   <div className="text-sm text-gray-400">
//                     [{formatDate(log.createdAt)}]
//                   </div>

//                   {/* LINE 2 */}
//                   <div className="text-white font-semibold">
//                     {userName}
//                   </div>

//                   {/* LINE 3 */}
//                   <div className="text-sm text-yellow-400">
//                     {log.method} {log.path}
//                   </div>

//                   {/* LINE 4 */}
//                   <div className="text-sm">

//                     {success ? (
//                       <span className="text-green-400">
//                         ✓ SUCCESS ({log.statusCode})
//                       </span>
//                     ) : (
//                       <span className="text-red-400">
//                         ✗ ERROR ({log.statusCode})
//                       </span>
//                     )}

//                     <span className="text-gray-400 ml-2">
//                       • {log.metadata?.durationMs ?? '-'} ms
//                     </span>

//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReportingLogsPage;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { useState, useMemo } from 'react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { SearchIcon, FilterIcon, CalendarIcon, Loader2 } from 'lucide-react';

// import { useGetAllLogQuery } from '@/redux/api/log';

// const ReportingLogsPage = () => {
//   // ─── STATES ─────────────────────────────
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusCode, setStatusCode] = useState<number | undefined>();
//   const [startDate, setStartDate] = useState<string | undefined>();
//   const [endDate, setEndDate] = useState<string | undefined>();

//   // ─── QUERY PARAMS ───────────────────────
//   const queryParams = useMemo(
//     () => ({
//       search: searchQuery || undefined,
//       statusCode,
//       startDate,
//       endDate,
//     }),
//     [searchQuery, statusCode, startDate, endDate],
//   );

//   // ─── API CALL ───────────────────────────
//   const { data, isLoading, isFetching } = useGetAllLogQuery(queryParams);

//   const logs = data?.data?.logs || [];

//   // ─── DATE FORMAT ────────────────────────
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);

//     return date.toLocaleString('en-US', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   // ─── FILTER HANDLERS ────────────────────

//   // status filter example
//   const handleStatusFilter = () => {
//     if (statusCode === 200) {
//       setStatusCode(undefined);
//     } else {
//       setStatusCode(200);
//     }
//   };

//   // today date range example
//   const handleTodayFilter = () => {
//     const today = new Date();

//     const start = new Date(today);
//     start.setHours(0, 0, 0, 0);

//     const end = new Date(today);
//     end.setHours(23, 59, 59, 999);

//     setStartDate(start.toISOString());
//     setEndDate(end.toISOString());
//   };

//   // clear date filter
//   const clearDateFilter = () => {
//     setStartDate(undefined);
//     setEndDate(undefined);
//   };

//   return (
//     <div className="p-4 sm:p-6 bg-background min-h-screen">
//       {/* Search & Filter */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
//         {/* SEARCH */}
//         <div className="relative w-full md:max-w-md">
//           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

//           <Input
//             placeholder="Search logs..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>

//         {/* FILTER BUTTONS */}
//         <div className="flex gap-2 flex-wrap">
//           {/* STATUS FILTER */}
//           {/* <Button
//             variant={statusCode === 200 ? 'default' : 'outline'}
//             onClick={handleStatusFilter}
//             className="flex items-center gap-2">
//             <FilterIcon className="h-4 w-4" />
//             Success Only
//           </Button> */}

//           {/* DATE FILTER */}
//           <Button
//             variant="outline"
//             onClick={handleTodayFilter}
//             className="flex items-center gap-2">
//             <CalendarIcon className="h-4 w-4" />
//             Today
//           </Button>

//           {/* CLEAR DATE */}
//           {(startDate || endDate) && (
//             <Button variant="outline" onClick={clearDateFilter}>
//               Clear Date
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* LOG LIST */}
//       <div className="bg-background rounded-lg shadow-sm p-4 sm:p-6">
//         {isLoading || isFetching ? (
//           <div className="flex justify-center py-10">
//             <Loader2 className="h-6 w-6 animate-spin" />
//           </div>
//         ) : logs.length === 0 ? (
//           <div className="text-center text-muted-foreground py-10">
//             No activity logs found
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {logs.map((log: any) => {
//               const userName = log.user
//                 ? `${log.user.firstName} ${log.user.lastName}`
//                 : log.userName || 'Guest';

//               return (
//                 <div
//                   key={log.id}
//                   className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 border-b last:border-b-0">
//                   {/* DATE */}
//                   <span className="text-xs sm:text-sm text-muted-foreground min-w-35">
//                     {formatDate(log.createdAt)}
//                   </span>

//                   {/* USER */}
//                   <span className="text-sm font-medium text-blue-600 min-w-30">
//                     {userName}
//                   </span>

//                   {/* DESCRIPTION */}
//                   <span className="text-sm flex-1 wrap-break-word">
//                     {log.description}
//                   </span>

//                   {/* STATUS */}
//                   <span
//                     className={`text-xs font-semibold px-2 py-1 rounded
//                       ${log.statusCode >= 200 && log.statusCode < 300
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-red-100 text-red-700'
//                       }`}>
//                     {log.statusCode}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReportingLogsPage;

// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // 'use client';

// // import {useState} from 'react';
// // import {Input} from '@/components/ui/input';
// // import {Button} from '@/components/ui/button';
// // import {SearchIcon, FilterIcon, CalendarIcon, Loader2} from 'lucide-react';
// // import {useGetAllLogQuery} from '@/redux/api/log';

// // const ReportingLogsPage = () => {
// //   const [searchQuery, setSearchQuery] = useState('');

// //   const {data, isLoading} = useGetAllLogQuery({});

// //   const logs = data?.data?.logs || [];

// //   const formatDate = (dateString: string) => {
// //     const date = new Date(dateString);

// //     return date.toLocaleString('en-US', {
// //       day: '2-digit',
// //       month: '2-digit',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit',
// //     });
// //   };

// //   return (
// //     <div className="p-4 sm:p-6 bg-background min-h-screen">
// //       {/* Search & Actions */}
// //       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
// //         <div className="relative w-full md:max-w-md">
// //           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground h-4 w-4" />
// //           <Input
// //             placeholder="Search by email, name, path..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="pl-10 w-full"
// //           />
// //         </div>

// //         <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
// //           <Button variant="outline" className="flex items-center gap-2">
// //             <FilterIcon className="h-4 w-4" />
// //             Filter
// //           </Button>

// //           <Button variant="outline" className="flex items-center gap-2">
// //             <CalendarIcon className="h-4 w-4" />
// //             Date Range
// //           </Button>
// //         </div>
// //       </div>

// //       {/* Logs */}
// //       <div className="bg-background rounded-lg shadow-sm p-4 sm:p-6">
// //         {isLoading ? (
// //           <div className="flex justify-center py-10">
// //             <Loader2 className="h-6 w-6 animate-spin" />
// //           </div>
// //         ) : logs.length === 0 ? (
// //           <div className="text-center text-muted-foreground py-10">
// //             No activity logs found
// //           </div>
// //         ) : (
// //           <div className="space-y-4">
// //             {logs.map((log: any) => {
// //               const userName = log.user
// //                 ? `${log.user.firstName} ${log.user.lastName}`
// //                 : log.userName || 'Guest';

// //               return (
// //                 <div
// //                   key={log.id}
// //                   className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-3 border-b border-muted last:border-b-0">
// //                   {/* Date */}
// //                   <span className="text-xs sm:text-sm text-muted-foreground">
// //                     {formatDate(log.createdAt)}
// //                   </span>

// //                   {/* User */}
// //                   <span className="text-sm text-chart-2 font-medium">
// //                     {userName}
// //                   </span>

// //                   {/* Description */}
// //                   <span className="text-sm text-foreground wrap-break-word">
// //                     {log.description}
// //                   </span>

// //                   {/* Status badge */}
// //                   <span
// //                     className={`text-xs font-medium px-2 py-0.5 rounded ml-auto
// //                       ${
// //                         log.statusCode >= 200 && log.statusCode < 300
// //                           ? 'bg-green-100 text-green-700'
// //                           : 'bg-red-100 text-red-700'
// //                       }`}>
// //                     {log.statusCode}
// //                   </span>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReportingLogsPage;
