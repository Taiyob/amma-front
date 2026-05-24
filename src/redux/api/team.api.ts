import { baseApi } from './baseApi';

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTeam: builder.mutation({
      query: (data) => ({
        url: '/team',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['team'],
    }),

    getAllTeams: builder.query({
      query: (params) => ({
        url: '/team',
        method: 'GET',
        params,
      }),
      providesTags: ['team'],
    }),

    getSingleTeam: builder.query({
      query: (id) => ({
        url: `/team/${id}`,
        method: 'GET',
      }),
      providesTags: ['team'],
    }),

    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/team/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['team'],
    }),

    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/team/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['team'],
    }),
  }),
});

export const {
  useAddTeamMutation,
  useGetAllTeamsQuery,
  useGetSingleTeamQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
