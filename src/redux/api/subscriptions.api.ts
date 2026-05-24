import { baseApi } from './baseApi';
import { Plan } from './plans.api';

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'PENDING' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  paystackCode: string;
  emailToken: string | null;
  nextPaymentDate: string | null;
  startDate: string;
  endDate: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  plan: Plan;
}

export interface InitializeSubscriptionResponse {
  data: {
    paymentUrl?: string;
    authorizationUrl?: string;
    reference?: string;
    subscription?: Subscription;
  };
}

const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initializeSubscription: builder.mutation<
      InitializeSubscriptionResponse,
      { planId: string }
    >({
      query: (data) => ({
        url: '/subscriptions/initialize',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['subscriptions'],
    }),

    getCurrentSubscription: builder.query<{ data: Subscription }, void>({
      query: () => '/subscriptions/current',
      providesTags: ['subscriptions'],
    }),
  }),
});

export const {
  useInitializeSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
} = subscriptionsApi;
