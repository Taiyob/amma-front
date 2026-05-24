import { baseApi } from './baseApi';

const medicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Add certification
    addMedication: builder.mutation({
      query: (data) => ({
        url: `/patients/medications`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['medication', 'visit', 'patient', 'care', 'booking'],
    }),

    getMedication: builder.query({
      query: (id) => `/patients/medications/${id}?activeOnly=true`,
      providesTags: ['medication'],
    }),

    getActiveMedication: builder.query({
      query: (id) => `/patient/medications/${id}/current`,
      providesTags: ['medication'],
    }),

    getActiveMedicationNoId: builder.query({
      query: () => `/patients/medications/my/current`,
      providesTags: ['medication'],
    }),

    getPreviousMedication: builder.query({
      query: (id) => `/patient/medications/${id}/history`,
      providesTags: ['medication'],
    }),

    updateMedication: builder.mutation({
      query: (args) => ({
        url: `/patients/medications/${args.id}`,
        method: 'PUT',
        body: args.data,
      }),
      invalidatesTags: ['medication', 'visit', 'patient', 'care', 'booking'],
    }),

    activeMedication: builder.mutation({
      query: (id) => ({
        url: `/patients/medications/${id}/deactivate`,
        method: 'PATCH',
      }),
      invalidatesTags: ['medication', 'visit', 'patient', 'care', 'booking'],
    }),

    deleteMedication: builder.mutation({
      query: (id) => ({
        url: `/patients/medications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['medication', 'visit', 'patient', 'care', 'booking'],
    }),
  }),
});

export const {
  useAddMedicationMutation,
  useGetMedicationQuery,
  useUpdateMedicationMutation,
  useDeleteMedicationMutation,
  useGetActiveMedicationQuery,
  useGetPreviousMedicationQuery,
  useGetActiveMedicationNoIdQuery,
} = medicationApi;
