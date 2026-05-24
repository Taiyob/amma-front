import {baseApi} from './baseApi';

const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Add certification
    addPatientProfile: builder.mutation({
      query: (formData) => ({
        url: `/patients/profile`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['patient', 'user'],
    }),

    getPatientProfiles: builder.query({
      query: (filters) => {
        const params = {};
        if (filters) Object.assign(params, filters);
        return {url: '/admin/patients', method: 'GET', params};
      },
      providesTags: ['patient'],
    }),

    getMyPatientProfiles: builder.query({
      query: (filters) => {
        const params = {};
        if (filters) Object.assign(params, filters);
        return {url: '/patients/my-patients', method: 'GET', params};
      },
      providesTags: ['patient'],
    }),

    getSinglePatientProfiles: builder.query({
      query: (id) => {
        return {url: `/patients/${id}`, method: 'GET'};
      },
      providesTags: ['patient'],
    }),

    getSinglePatientAiInsight: builder.query({
      query: (id) => {
        return {url: `/patients/${id}/health-insights`, method: 'GET'};
      },
      providesTags: ['patient'],
    }),

    getPatientDashboardStats: builder.query({
      query: (patientId) => {
        return {url: `/patient/${patientId}/dashboard-stats`, method: 'GET'};
      },
      providesTags: ['patient'],
    }),

    updatePatientAiInsight: builder.mutation({
      query: (args) => ({
        url: `/patients/${args.patientId}/health-insights/${args.insightsId}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['patient', 'user'],
    }),

    deletePatientByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/patients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['patient', 'user'],
    }),

    deletePatient: builder.mutation({
      query: (patientId) => ({
        url: `/patient/${patientId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['patient', 'user'],
    }),

    addMedicalRecord: builder.mutation({
      query: (formData) => ({
        url: `/patients/medical-records`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['patient'],
    }),

    getMedicalRecord: builder.query({
      query: (id) => `/patients/medical-records/${id}`,
      providesTags: ['patient'],
    }),

    // for admin
    updatePatient: builder.mutation({
      query: (args) => ({
        url: `/patients/${args.id}`,
        method: 'PATCH',
        body: args.formData,
      }),
      invalidatesTags: ['patient', 'user'],
    }),

    updatePatientAdmin: builder.mutation({
      query: (args) => ({
        url: `/admin/patients/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['patient', 'user'],
    }),

    addMedicationPatient: builder.mutation({
      query: (args) => ({
        url: `/admin/patients/${args.id}/medications`,
        method: 'POST',
        body: args.data,
      }),
      invalidatesTags: ['patient', 'user'],
    }),

    deleteMedications: builder.mutation({
      query: (id) => ({
        url: `/admin/medications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['patient', 'user', 'medication'],
    }),

    uploadDocumentPatient: builder.mutation({
      query: (args) => ({
        url: `/admin/patients/${args.id}/documents`,
        method: 'POST',
        body: args.data,
      }),
      invalidatesTags: ['patient', 'user', 'document'],
    }),

    deleteDocumentPatient: builder.mutation({
      query: (id) => ({
        url: `/admin/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['patient', 'user', 'document'],
    }),

    scheduleVisitPatient: builder.mutation({
      query: (args) => ({
        url: `/admin/patients/${args.id}/visits`,
        method: 'POST',
        body: args.data,
      }),
      invalidatesTags: ['patient', 'user', 'visit'],
    }),

    deleteVisitPatient: builder.mutation({
      query: (id) => ({
        url: `/admin/visits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['patient', 'user', 'visit'],
    }),

    getSearchPatients: builder.query({
      query: (params) => {
        return {
          url: '/admin/patients',
          method: 'GET',
          params,
        };
      },
    }),

    getPatientsByUser: builder.query({
      query: (userId) => `/admin/users/${userId}/patients`,
      providesTags: ['patient'],
    }),

    aiQuery: builder.mutation({
      query: (args) => ({
        url: `/patient/${args.patientId}/ai-query`,
        method: 'POST',
        body: {message: args.message},
      }),
    }),
  }),
});

export const {
  useAddMedicalRecordMutation,
  useGetMyPatientProfilesQuery,
  useGetPatientProfilesQuery,
  useAddPatientProfileMutation,
  useGetMedicalRecordQuery,
  useGetSinglePatientProfilesQuery,
  useGetSinglePatientAiInsightQuery,
  useUpdatePatientAiInsightMutation,
  useDeletePatientMutation,
  useGetSearchPatientsQuery,
  useUpdatePatientAdminMutation,
  // admin

  useUpdatePatientMutation,
  useAddMedicationPatientMutation,
  useDeleteMedicationsMutation,
  useUploadDocumentPatientMutation,
  useDeleteDocumentPatientMutation,
  useScheduleVisitPatientMutation,
  useDeleteVisitPatientMutation,
  useDeletePatientByAdminMutation,
  useGetPatientsByUserQuery,
  useGetPatientDashboardStatsQuery,
  useAiQueryMutation,
} = patientApi;
