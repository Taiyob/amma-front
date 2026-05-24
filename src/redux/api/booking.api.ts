import { baseApi } from './baseApi';

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST - Add certification
    addBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['booking'],
    }),

    getBooking: builder.query({
      query: (id) => `/bookings/${id}`,
      providesTags: ['booking'],
    }),

    getAddress: builder.query({
      query: (id) => `/patients/${id}/addresses`,
    }),

    paymentForBooking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/bookings/${id}/confirm`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['booking'],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useGetBookingQuery,
  usePaymentForBookingMutation,
  useGetAddressQuery,
} = bookingApi;
