import {baseApi} from '@/redux/api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login/',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['auth', 'user', 'patient', 'booking', 'chat', 'visit'],
    }),

    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    staffRegistration: builder.mutation({
      query: (data) => ({
        url: `/auth/invitation/register`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['staff'],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: 'auth/change-password/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    forgetOtp: builder.mutation({
      query: (data) => ({
        url: 'auth/verify-reset-password-OTP',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    resetOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    verifyEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-email/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['auth'],
    }),

    // ADDED: This endpoint is specifically for resending the code
    resendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/resend-email-verification/', // URL for resending
        method: 'POST',
        body: data, // Sends { email }
      }),
      invalidatesTags: ['auth'],
    }),

    // ADDED: Logout endpoint — clears the HttpOnly cookie on the backend
    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useForgetOtpMutation,
  useResetOtpMutation,
  useStaffRegistrationMutation,
  useLogoutUserMutation,
} = authApi;
