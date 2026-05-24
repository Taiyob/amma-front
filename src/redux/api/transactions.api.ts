import { baseApi } from './baseApi';

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminTransactions: builder.query({
      query: (params) => ({
        url: '/transactions/all',
        method: 'GET',
        params,
      }),
      providesTags: ['transactions'],
    }),
    getUserTransactions: builder.query({
      query: (params) => ({
        url: '/transactions/user',
        method: 'GET',
        params,
      }),
      providesTags: ['transactions'],
    }),
  }),
});

export const {
  useGetAdminTransactionsQuery,
  useGetUserTransactionsQuery,
} = transactionsApi;
