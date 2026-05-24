// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import type {RootState} from '../store';

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://amazonrose-backedl-uz2fr6-636844-13-135-112-55.traefik.me';

// const baseQuery = fetchBaseQuery({
//   baseUrl: `${BASE_URL}/api/v1`,
//   credentials: 'include',
//   prepareHeaders: (headers, {getState}) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: async (args, api, extraOptions) => {
//     const result = await baseQuery(args, api, extraOptions);

//     //  Auto logout if token is invalid/expired
//     if (result?.error?.status === 401  result?.error?.status === 403) {
//       // api.dispatch(clearAuth());
//       // api.dispatch(logoutSuccess());
//       localStorage.removeItem('auth');
//     }

//     return result;
//   },
//   tagTypes: [
//     'auth',
//     'user',
//     'patient',
//     'service',
//     'booking',
//     'medication',
//     'care',
//     'document',
//     'visit',
//     'staff',
//     'log',
//     'chat',
//   ],
//   endpoints: () => ({}),
// });

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

const BASE_URL = 'https://api.mojacares.com';
// const BASE_URL = 'http://localhost:3030';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    //  Auto logout if token is invalid/expired
    if (result?.error?.status === 401 || result?.error?.status === 403) {
      // api.dispatch(clearAuth());
      // api.dispatch(logoutSuccess());
      localStorage.removeItem('auth');
    }

    return result;
  },
  tagTypes: [
    'auth',
    'user',
    'patient',
    'service',
    'booking',
    'medication',
    'care',
    'document',
    'visit',
    'staff',
    'log',
    'chat',
    'apply',
    'plans',
    'subscriptions',
    'notifications',
    'transactions',
    'team',
  ],
  endpoints: () => ({}),
});
