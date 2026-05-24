'use client';

import {useState} from 'react';
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  Notification,
} from '@/redux/api/notifications.api';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {
  CheckCheck,
  Bell,
  Calendar,
  // ChevronLeft,
  // ChevronRight,
  Inbox,
} from 'lucide-react';
import {toast} from 'sonner';
import {cn} from '@/lib/utils';

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const {data: notificationsData, isLoading} = useGetNotificationsQuery({
    page,
    limit: 999,
  });
  const [markAllAsRead, {isLoading: isMarkingAll}] = useMarkAllAsReadMutation();
  const [markAsRead] = useMarkAsReadMutation();

  const notifications = notificationsData?.data || [];
  // const pagination = notificationsData?.meta?.pagination;

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success('All notifications marked as read');
    } catch {
      toast.error('Failed to mark notifications as read');
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
    } catch {
      // toast.error('Failed to mark as read');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Bell className="h-8 w-8 text-secondary" />
            Notifications
          </h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with your latest activities and system alerts.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleMarkAllAsRead}
          disabled={isMarkingAll || notifications.every((n) => n.isRead)}
          className="w-fit">
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-10 w-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm animate-pulse">
              Loading notifications...
            </p>
          </div>
        ) : notifications.length > 0 ? (
          <>
            <div className="grid gap-3">
              {notifications.map((n: Notification) => (
                <Card
                  key={n.id}
                  className={cn(
                    'transition-all hover:shadow-md cursor-pointer border-l-4',
                    n.isRead
                      ? 'border-l-transparent'
                      : 'border-l-secondary bg-secondary/5 shadow-sm',
                  )}
                  onClick={() => !n.isRead && handleMarkAsRead(n.id)}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div
                      className={cn(
                        'p-2 rounded-full shrink-0',
                        n.isRead
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-secondary/10 text-secondary',
                      )}>
                      {n.isRead ? (
                        <Inbox className="h-5 w-5" />
                      ) : (
                        <Bell className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3
                          className={cn(
                            'font-semibold text-base truncate',
                            !n.isRead && 'text-foreground',
                          )}>
                          {n.title}
                        </h3>
                        {!n.isRead && (
                          <Badge
                            variant="secondary"
                            className="bg-secondary text-background hover:bg-secondary/90 text-[10px] h-5">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {n.message}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-muted-foreground text-xs">
                        <Calendar className="h-3 w-3" />
                        {new Date(n.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {/* {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrevious}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="text-sm font-medium">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )} */}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-xl border-2 border-dashed">
            <Inbox className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h2 className="text-xl font-semibold text-foreground/60">
              No Notifications
            </h2>
            <p className="text-muted-foreground mt-1">
              You&apos;re all caught up!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
