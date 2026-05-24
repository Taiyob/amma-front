import {baseApi} from './baseApi';

const visitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createScheduleVisits: builder.mutation({
      query: (args) => ({
        url: `/admin/patients/${args.id}/visits`,
        method: 'PUT',
        body: args.data,
      }),
      invalidatesTags: ['visit'],
    }),

    deleteScheduleVisits: builder.mutation({
      query: (id) => ({
        url: `/admin/visits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['visit'],
    }),

    addPreviousPatientVisit: builder.mutation({
      query: (formData) => ({
        url: `/patients/previous-visits`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['patient', 'visit'],
    }),

    addPreviousPatientVisitWithMedication: builder.mutation({
      query: (formData) => ({
        url: `/patient/previous-visits/with-medications`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['patient', 'visit'],
    }),

    updatePreviousPatientVisit: builder.mutation({
      query: ({id, formData}) => ({
        url: `/patient/previous-visits/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['patient', 'visit'],
    }),

    getPreviousPatientVisit: builder.query({
      query: (id) => `/patients/previous-visits/${id}`,
      providesTags: ['visit'],
    }),

    getSinglePatientVisit: builder.query({
      query: (visitID) => `/patients/previous-visits/detail/${visitID}`,
      providesTags: ['visit'],
    }),
  }),
});

export const {
  useCreateScheduleVisitsMutation,
  useDeleteScheduleVisitsMutation,
  useAddPreviousPatientVisitMutation,
  useGetPreviousPatientVisitQuery,
  useUpdatePreviousPatientVisitMutation,
  useAddPreviousPatientVisitWithMedicationMutation,
  useGetSinglePatientVisitQuery,
} = visitApi;
