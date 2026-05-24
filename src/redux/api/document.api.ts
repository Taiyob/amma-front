import {baseApi} from './baseApi';

const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadDocument: builder.mutation({
      query: (args) => ({
        url: `/admin/patients/${args.id}/documents`,
        method: 'PUT',
        body: args.formData,
      }),
      invalidatesTags: ['document'],
    }),

    uploadMedicalReport: builder.mutation({
      query: (args) => ({
        url: `/patient/medical-records`,
        method: 'POST',
        body: args,
      }),
      invalidatesTags: ['document', 'visit', 'patient', 'care', 'booking'],
    }),

    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/patient/medical-records/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['document', 'visit', 'patient', 'care', 'booking'],
    }),

    deleteDocumentAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['document', 'visit', 'patient', 'care', 'booking'],
    }),
  }),
});

export const {
  useDeleteDocumentAdminMutation,
  useUploadDocumentMutation,
  useUploadMedicalReportMutation,
  useDeleteDocumentMutation,
} = documentApi;
