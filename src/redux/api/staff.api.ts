import {baseApi} from './baseApi';
import {IStaffResponse} from '@/types/staff';

const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStaff: builder.query<IStaffResponse, object>({
      query: () => `/admin/staff`,
      providesTags: ['staff'],
    }),

    getAvailableStaff: builder.query<IStaffResponse, object>({
      query: () => `/admin/staff/available`,
      providesTags: ['staff'],
    }),

    getMyAssignTask: builder.query({
      query: (status?: string) => ({
        url: '/staff/assignments',
        params: status ? {status} : {},
      }),
      providesTags: ['staff'],
    }),

    staffDashboardSummary: builder.query({
      query: () => `/staff/dashboard/summary`,
      providesTags: ['staff'],
    }),

    startAssignTask: builder.mutation({
      query: (id) => ({
        url: `/staff/assignments/${id}/start`,
        method: 'PATCH',
      }),
      invalidatesTags: ['staff'],
    }),

    completeAssignTask: builder.mutation({
      query: (id) => ({
        url: `/staff/assignments/${id}/complete`,
        method: 'PATCH',
      }),
      invalidatesTags: ['staff'],
    }),

    staffInvitation: builder.mutation({
      query: (data) => ({
        url: `/admin/staff/invite`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['staff'],
    }),

    getStaffAssignTask: builder.query({
      query: (bookingId) => `/care-requests/${bookingId}/assign`,
      providesTags: ['staff'],
    }),

    assignStaff: builder.mutation({
      query: (data) => ({
        url: `/care-requests/${data.bookingId}/assign`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['staff', 'care', 'user', 'patient'],
    }),

    getTodayAssignments: builder.query({
      query: () => ({
        url: '/staff/assignments/today',
        method: 'GET',
      }),
      providesTags: ['staff'],
    }),

    updateCareRequest: builder.mutation({
      query: ({bookingId, formData}) => ({
        url: `/care-requests/${bookingId}/patient-update`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['staff', 'care', 'user', 'patient'],
    }),
  }),
});

export const {
  useGetAllStaffQuery,
  useGetMyAssignTaskQuery,
  useStaffDashboardSummaryQuery,
  useCompleteAssignTaskMutation,
  useStartAssignTaskMutation,
  useStaffInvitationMutation,
  useGetStaffAssignTaskQuery,
  useAssignStaffMutation,
  useGetAvailableStaffQuery,
  useGetTodayAssignmentsQuery,
  useUpdateCareRequestMutation,
} = staffApi;
