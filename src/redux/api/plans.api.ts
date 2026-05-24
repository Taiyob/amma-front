import {baseApi} from './baseApi';

export type PlanInterval = 'Monthly' | 'Yearly';
export type PlanName = 'Starter' | 'Business' | 'Enterprise';

export interface Plan {
  id: string;
  name: PlanName;
  description: string;
  price: number;
  interval: PlanInterval;
  features: string[] | null;
  discount: number;
  paystackCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  perMonth: number;
  discountedPrice: number;
}

export interface CreatePlanPayload {
  name: PlanName;
  description: string;
  price: number;
  interval: PlanInterval;
  features: string[];
  discount?: string;
}

export interface UpdatePlanPayload {
  id: string;
  data: Partial<CreatePlanPayload>;
}

export interface UpdatePlanStatusPayload {
  id: string;
  isActive: boolean;
}

const plansApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query<{data: Plan[]}, void>({
      query: () => '/plans',
      providesTags: ['plans'],
    }),

    createPlan: builder.mutation<{data: Plan}, CreatePlanPayload>({
      query: (data) => ({
        url: '/plans',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['plans'],
    }),

    updatePlan: builder.mutation<{data: Plan}, UpdatePlanPayload>({
      query: ({id, data}) => ({
        url: `/plans/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['plans'],
    }),

    updatePlanStatus: builder.mutation<{data: Plan}, UpdatePlanStatusPayload>({
      query: ({id, isActive}) => ({
        url: `/plans/${id}/status`,
        method: 'PATCH',
        body: {isActive},
      }),
      invalidatesTags: ['plans'],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useUpdatePlanStatusMutation,
} = plansApi;
