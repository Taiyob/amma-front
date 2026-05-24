import { baseApi } from "./baseApi";

export const publicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContactForm: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
    submitUrgentCareRequest: builder.mutation({
      query: (data) => ({
        url: "/urgent-care-request",
        method: "POST",
        body: data,
      }),
    }),
    submitMobileVisitRequest: builder.mutation({
      query: (data) => ({
        url: "/mobile-visit-request",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { 
  useSubmitContactFormMutation,
  useSubmitUrgentCareRequestMutation,
  useSubmitMobileVisitRequestMutation
} = publicApi;
