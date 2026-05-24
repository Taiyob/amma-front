import {baseApi} from './baseApi';

const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Add certification
    addService: builder.mutation({
      query: (data) => ({
        url: `/services`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['service'],
    }),

    getAllService: builder.query({
      query: () => `/services`,
      providesTags: ['service'],
    }),

    getSingleService: builder.query({
      query: (id) => `/services/${id}`,
      providesTags: ['service'],
    }),

    updateService: builder.mutation({
      query: ({id, data}) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        body: data,
      }),

      invalidatesTags: ['service'],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['service'],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
