/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserDetailResponse, IUserResponse } from '@/types/user';
import { baseApi } from './baseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query<IUserResponse, any>({
      query: (params) => {
        return {
          url: '/admin/users',
          method: 'GET',
          params,
        };
      },
      providesTags: ['user'],
    }),

    getMe: builder.query({
      query: () => {
        return {
          url: '/auth/profile',
          method: 'GET',
        };
      },
      providesTags: ['user'],
    }),

    getSingleUser: builder.query<IUserDetailResponse, string>({
      query: (id) => {
        return {
          url: `/admin/users/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['user'],
    }),

    updateUserStatus: builder.mutation({
      query: (args) => ({
        url: `/admin/users/${args.id}/status`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['user'],
    }),

    updateUserRole: builder.mutation({
      query: (args) => ({
        url: `/admin/users/${args.id}/role`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['user'],


    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useGetMeQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
} = userApi;
