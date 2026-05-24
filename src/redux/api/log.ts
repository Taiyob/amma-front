import { baseApi } from './baseApi';

const logApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLog: builder.query({
      query: (params) => {
        return {
          url: '/admin/logs',
          method: 'GET',
          params,
        };
      },
      providesTags: ['log'],
    }),


    getAdminStats: builder.query({
      query: () => {
        return {
          url: '/care-requests/admin/stats',
          method: 'GET',
        };
      },

    }),
  }),
});

export const { useGetAllLogQuery, useGetAdminStatsQuery } = logApi;
