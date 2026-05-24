import { baseApi } from './baseApi';

// ─── Types (match API responses) ───────────────────────────────────────────
export type ChatSessionType = 'ASSISTANT' | 'SUPPORT';

export type ChatMessage = {
  id: string;
  sessionId: string;
  sender: 'USER' | 'AGENT' | 'AI';
  message: string;
  metadata: any;
  createdAt: string;
};

export type ChatUser = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};

export type ChatSession = {
  id: string;
  userId: string;
  patientId: string | null;
  type: ChatSessionType;
  status: string;
  createdAt: string;
  updatedAt: string;
  user?: ChatUser;
  messages: ChatMessage[];
};

export type CreateSessionBody = {
  type: ChatSessionType;
  patientId?: string;
};

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatHistory: builder.query<ChatMessage[], string>({
      query: (sessionId) => `/chat/${sessionId}/history`,
      transformResponse: (res: { data?: ChatMessage[] }) => res?.data ?? [],
      providesTags: (_result, _err, sessionId) => [
        { type: 'chat', id: sessionId },
        { type: 'chat', id: 'HISTORY' },
      ],
    }),

    createChatSession: builder.mutation<ChatSession, CreateSessionBody>({
      query: (body) => ({
        url: `/chat/start`,
        method: 'POST',
        body,
      }),
      transformResponse: (res: { data?: ChatSession }) =>
        res?.data as ChatSession,
      invalidatesTags: [{ type: 'chat', id: 'LIST' }],
    }),

    sendMessage: builder.mutation<
      ChatMessage,
      { sessionId: string; message: string }
    >({
      query: ({ sessionId, message }) => ({
        url: `/chat/${sessionId}/message`,
        method: 'POST',
        body: { message },
      }),
      transformResponse: (res: { data?: ChatMessage }) =>
        res?.data as ChatMessage,
      invalidatesTags: (_result, _err, { sessionId }) => [
        { type: 'chat', id: sessionId },
        { type: 'chat', id: 'HISTORY' },
        { type: 'chat', id: 'LIST' },
      ],
    }),

    getChatSessions: builder.query<ChatSession[], void>({
      query: () => `/chat/sessions`,
      transformResponse: (res: { data?: ChatSession[] }) => res?.data ?? [],
      providesTags: [{ type: 'chat', id: 'LIST' }],
    }),

    // --- Admin Endpoints ---
    getAdminChatSessions: builder.query<ChatSession[], void>({
      query: () => `/chat/admin/sessions`,
      transformResponse: (res: { data?: ChatSession[] }) => res?.data ?? [],
      providesTags: [{ type: 'chat', id: 'ADMIN_LIST' }],
    }),

    getAdminChatHistory: builder.query<ChatMessage[], string>({
      query: (sessionId) => `/chat/admin/${sessionId}/history`,
      transformResponse: (res: { data?: ChatMessage[] }) => res?.data ?? [],
      providesTags: (_result, _err, sessionId) => [
        { type: 'chat', id: sessionId },
        { type: 'chat', id: 'ADMIN_HISTORY' },
      ],
    }),

    adminSendMessage: builder.mutation<
      ChatMessage,
      { sessionId: string; message: string }
    >({
      query: ({ sessionId, message }) => ({
        url: `/chat/admin/${sessionId}/message`,
        method: 'POST',
        body: { message },
      }),
      transformResponse: (res: { data?: ChatMessage }) =>
        res?.data as ChatMessage,
      invalidatesTags: (_result, _err, { sessionId }) => [
        { type: 'chat', id: sessionId },
        { type: 'chat', id: 'ADMIN_HISTORY' },
        { type: 'chat', id: 'ADMIN_LIST' },
      ],
    }),
  }),
});

export const {
  useGetChatHistoryQuery,
  useCreateChatSessionMutation,
  useSendMessageMutation,
  useGetChatSessionsQuery,
  useGetAdminChatSessionsQuery,
  useGetAdminChatHistoryQuery,
  useAdminSendMessageMutation,
} = chatApi;
