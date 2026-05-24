import { baseApi } from './baseApi';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  metadata?: any;
  createdAt: string;
}

export interface GetNotificationsResponse {
  success: boolean;
  message: string;
  meta: {
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  };
  data: Notification[];
}

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<GetNotificationsResponse, { page?: number; limit?: number }>({
      query: (params) => ({
        url: '/notifications',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
        },
      }),
      providesTags: ['notifications'],
    }),

    markAsRead: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['notifications'],
    }),

    markAllAsRead: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/notifications/read-all',
        method: 'PATCH',
      }),
      invalidatesTags: ['notifications'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationsApi;
