import { baseApi } from './baseApi';

const applyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // POST - Add 
        addApply: builder.mutation({
            query: (data) => ({
                url: `/apply`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['apply'],
        }),

        getAllApply: builder.query({
            query: () => `/apply`,
            providesTags: ['apply'],
        }),

        getSingleApply: builder.query({
            query: (id) => `/apply/${id}`,
            providesTags: ['apply'],
        }),
    }),
});

export const {
    useAddApplyMutation,
    useGetAllApplyQuery,
    useGetSingleApplyQuery,
} = applyApi;
