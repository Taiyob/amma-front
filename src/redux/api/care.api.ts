import { baseApi } from './baseApi';

const careApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCareRequest: builder.query({
      query: (params) => {
        return {
          url: `/care-requests/admin`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['care'],
    }),

    getPendingCareRequest: builder.query({
      query: (params) => {
        return {
          url: `/care-requests/admin/pending`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['care'],
    }),

    getCompletedCareRequest: builder.query({
      query: (params) => {
        return {
          url: `/care-requests/admin/completed`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['care'],
    }),

    getOngoingCareRequest: builder.query({
      query: (params) => {
        return {
          url: `/care-requests/admin/ongoing`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['care'],
    }),
    getScheduledCareRequest: builder.query({
      query: (params) => {
        return {
          url: `/care-requests/admin/scheduled`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['care'],
    }),

    getPaidCareRequest: builder.query({
      query: (params) => {
        return {
          url: `/care-requests/admin/paid`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['care'],
    }),

    getCareRequestStats: builder.query({
      query: () => `/care-requests/admin/stats`,
      providesTags: ['care'],
    }),

    getUpcomingCareRequest: builder.query({
      query: (patientId) => `/care-requests/upcoming/${patientId}`,
      providesTags: ['care'],
    }),

    getPatientAllCareRequest: builder.query({
      query: (patientId) => `/care-requests/patient/${patientId}`,
      providesTags: ['care'],
    }),

    getSingleCareRequest: builder.query({
      query: (bookingId) => `/care-requests/detail/${bookingId}`,
      providesTags: ['care'],
    }),

    addCareRequest: builder.mutation({
      query: (args) => ({
        url: `/care-requests`,
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['medication', 'care'],
    }),

    updateMedicationAdmin: builder.mutation({
      query: (args) => ({
        url: `/admin/patients/${args.id}/medications`,
        method: 'PUT',
        body: args.data,
      }),
      invalidatesTags: ['medication'],
    }),

    deleteMedicationAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/medications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['medication'],
    }),

    getAllLogs: builder.query({
      query: () => `/admin/logs`,
    }),

    updateCareRequestCare: builder.mutation({
      query: ({ id, data }) => ({
        url: `/care-requests/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['care'],
    }),

    deleteCareRequest: builder.mutation({
      query: (id) => ({
        url: `/care-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['care'],
    }),

    updateCareRequestNote: builder.mutation({
      query: ({ id, data }) => ({
        url: `/care-requests/${id}/note`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['care'],
    }),


    updateCareRequestAdmin: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/care-requests/admin-update/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['care'],
    }),
  }),
});

export const {
  useGetAllLogsQuery,
  useGetAllCareRequestQuery,
  useGetCareRequestStatsQuery,
  useUpdateMedicationAdminMutation,
  useDeleteMedicationAdminMutation,
  useAddCareRequestMutation,
  useGetPatientAllCareRequestQuery,
  useGetUpcomingCareRequestQuery,
  useGetSingleCareRequestQuery,
  useGetPendingCareRequestQuery,
  useGetCompletedCareRequestQuery,
  useGetOngoingCareRequestQuery,
  useGetPaidCareRequestQuery,
  useGetScheduledCareRequestQuery,
  useUpdateCareRequestCareMutation,
  useDeleteCareRequestMutation,
  useUpdateCareRequestNoteMutation,
  useUpdateCareRequestAdminMutation,
} = careApi;
