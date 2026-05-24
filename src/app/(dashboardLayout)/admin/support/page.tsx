'use client';

import React, {useState, useEffect, useRef, useMemo} from 'react';
import {Search, Send, Loader2} from 'lucide-react';
import {
  useGetAdminChatSessionsQuery,
  useGetAdminChatHistoryQuery,
  useAdminSendMessageMutation,
  type ChatMessage,
  type ChatSession,
  chatApi,
} from '@/redux/api/chat.api';
import {useSocket} from '@/hooks/useSocket';
import {useAppDispatch} from '@/redux/hooks';
import dayjs from 'dayjs';
import Image from 'next/image';

const STORAGE_KEY = 'mjc_admin_unread_counts';
const LAST_READ_KEY = 'mjc_admin_last_read_ids';

/**
 * SupportChatPage Component
 *
 * A modern, responsive support chat interface for administrators.
 * Integrated with WebSocket and Chat APIs for real-time communication.
 */
const SupportChatPage = () => {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Persistent unread and preview state
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [lastReadIds, setLastReadIds] = useState<Record<string, string>>({});
  const [sessionPreviews, setSessionPreviews] = useState<
    Record<string, {message: string; time: string}>
  >({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Track processed socket event IDs to prevent duplicate handling or loops
  const processedEventUniqueIdRef = useRef<Set<string>>(new Set());

  const dispatch = useAppDispatch();

  // --- API Hooks ---
  const {data: sessionsData = [], isLoading: sessionsLoading} =
    useGetAdminChatSessionsQuery();
  const {data: history = [], isLoading: historyLoading} =
    useGetAdminChatHistoryQuery(selectedSessionId!, {
      skip: !selectedSessionId,
    });
  const [sendMessage, {isLoading: isSending}] = useAdminSendMessageMutation();

  // --- Persistence Logic ---
  useEffect(() => {
    const savedCounts = localStorage.getItem(STORAGE_KEY);
    const savedIds = localStorage.getItem(LAST_READ_KEY);
    if (savedCounts) {
      try {
        setUnreadCounts(JSON.parse(savedCounts));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedIds) {
      try {
        setLastReadIds(JSON.parse(savedIds));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(unreadCounts).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unreadCounts));
    }
  }, [unreadCounts]);

  useEffect(() => {
    if (Object.keys(lastReadIds).length > 0) {
      localStorage.setItem(LAST_READ_KEY, JSON.stringify(lastReadIds));
    }
  }, [lastReadIds]);

  // Initialize counts from sessionsData carefully to avoid render loops
  useEffect(() => {
    if (sessionsData.length > 0) {
      setUnreadCounts((prev) => {
        const updated = {...prev};
        let changed = false;
        sessionsData.forEach((session) => {
          const latestMsg = session.messages?.[0];
          if (
            latestMsg &&
            latestMsg.sender === 'USER' &&
            lastReadIds[session.id] !== latestMsg.id
          ) {
            if (!updated[session.id]) {
              updated[session.id] = 1;
              changed = true;
            }
          }
        });
        return changed ? updated : prev;
      });
    }
  }, [sessionsData, lastReadIds]);

  // --- WebSocket Hook ---
  const roomIds = useMemo(() => {
    const rooms = ['SUPPORT_ADMIN'];
    if (selectedSessionId) rooms.push(selectedSessionId);
    return rooms;
  }, [selectedSessionId]);

  const {lastEvent, isOpponentTyping, sendTyping} = useSocket(roomIds);

  // --- WebSocket Message Handling (Real-Time UI Updates) ---
  useEffect(() => {
    if (!lastEvent) return;

    const {type, data} = lastEvent;
    // Construct a unique ID for this event to avoid re-processing
    const eventMsgId =
      data.message?.id ||
      data.id ||
      data.session?.id ||
      JSON.stringify(data).slice(0, 50);
    const eventUniqueKey = `${type}_${eventMsgId}`;

    if (processedEventUniqueIdRef.current.has(eventUniqueKey)) return;
    processedEventUniqueIdRef.current.add(eventUniqueKey);

    if (type === 'CHAT_MESSAGE') {
      const message = data.message || data;
      const sessionId = data.sessionId || message.sessionId;

      setSessionPreviews((prev) => ({
        ...prev,
        [sessionId]: {
          message: message.message,
          time: message.createdAt || new Date().toISOString(),
        },
      }));

      if (sessionId === selectedSessionId) {
        setLastReadIds((prev) => {
          if (prev[sessionId] === message.id) return prev;
          return {...prev, [sessionId]: message.id};
        });
      } else if (message.sender === 'USER') {
        setUnreadCounts((prev) => ({
          ...prev,
          [sessionId]: (prev[sessionId] || 0) + 1,
        }));
      }

      // Persistence via RTK Cache - This automatically updates 'history' data
      dispatch(
        chatApi.util.updateQueryData(
          'getAdminChatHistory',
          sessionId,
          (draft: ChatMessage[]) => {
            if (!draft.some((m: ChatMessage) => m.id === message.id)) {
              draft.push(message);
            }
          },
        ),
      );

      dispatch(
        chatApi.util.updateQueryData(
          'getAdminChatSessions',
          undefined,
          (draft: ChatSession[]) => {
            const sessionIndex = draft.findIndex(
              (s: ChatSession) => s.id === sessionId,
            );
            if (sessionIndex !== -1) {
              const session = draft[sessionIndex];
              session.updatedAt = message.createdAt || new Date().toISOString();
              session.messages = [message];
              draft.splice(sessionIndex, 1);
              draft.unshift(session);
            }
          },
        ),
      );
    }

    if (type === 'NEW_CHAT_SESSION') {
      const newSession = data.session;
      if (newSession) {
        dispatch(
          chatApi.util.updateQueryData(
            'getAdminChatSessions',
            undefined,
            (draft: ChatSession[]) => {
              if (!draft.some((s: ChatSession) => s.id === newSession.id)) {
                draft.unshift(newSession);
              }
            },
          ),
        );
      }
    }
  }, [lastEvent, selectedSessionId, dispatch]);

  // Reset unread count for selected session
  useEffect(() => {
    if (selectedSessionId) {
      setUnreadCounts((prev) => {
        if (prev[selectedSessionId] === 0) return prev;
        return {...prev, [selectedSessionId]: 0};
      });
      const currentSession = sessionsData.find(
        (s) => s.id === selectedSessionId,
      );
      const latestId = currentSession?.messages?.[0]?.id;
      if (latestId) {
        setLastReadIds((prev) => {
          if (prev[selectedSessionId] === latestId) return prev;
          return {...prev, [selectedSessionId]: latestId};
        });
      }
    }
  }, [selectedSessionId, sessionsData]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [history, isOpponentTyping]);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    sendTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(false);
    }, 2000);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text || !selectedSessionId || isSending) return;

    try {
      const result = await sendMessage({
        sessionId: selectedSessionId,
        message: text,
      }).unwrap();
      setInputValue('');
      if (result?.id) {
        setLastReadIds((prev) => ({...prev, [selectedSessionId]: result.id}));
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const activeSession = sessionsData.find((s) => s.id === selectedSessionId);

  const filteredSessions = sessionsData.filter(
    (s) =>
      s.user?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.user?.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedFilteredSessions = useMemo(() => {
    return [...filteredSessions].sort((a, b) => {
      const timeA = sessionPreviews[a.id]?.time || a.updatedAt;
      const timeB = sessionPreviews[b.id]?.time || b.updatedAt;
      return new Date(timeB).getTime() - new Date(timeA).getTime();
    });
  }, [filteredSessions, sessionPreviews]);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] bg-[#F8F9FA] p-6 text-[#2D3436]">
      {/* Page Header */}
      <div className="mb-8 pl-1">
        <h1 className="text-3xl font-bold tracking-tight text-[#1E272E]">
          Support chat
        </h1>
        <p className="text-sm text-[#7F8C8D] mt-1 font-medium">
          Respond to patient inquiries as admin
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="flex bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-[#EDF2F7] overflow-hidden flex-1">
        {/* --- Left Sidebar: Conversations List --- */}
        <div className="w-85 border-r border-[#EDF2F7] flex flex-col bg-white">
          <div className="p-6 pb-4">
            <h2 className="text-lg font-bold mb-5 text-[#1E272E]">
              Conversations
            </h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] w-4.5 h-4.5 group-focus-within:text-[#FF793F] transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-[#F1F5F9] rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none border-2 border-transparent focus:border-[#FF793F]/20 focus:bg-white transition-all placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-200">
            {sessionsLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-orange-500" />
              </div>
            ) : (
              sortedFilteredSessions.map((session) => {
                const previewMessage =
                  sessionPreviews[session.id]?.message ||
                  session.messages?.[0]?.message ||
                  'No messages yet';
                const previewTime =
                  sessionPreviews[session.id]?.time || session.updatedAt;
                const unread = unreadCounts[session.id] || 0;
                const isSelected = selectedSessionId === session.id;

                return (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSessionId(session.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all mb-2 relative ${
                      isSelected
                        ? 'bg-[#FFF5F1] shadow-sm shadow-orange-100'
                        : 'hover:bg-[#F8FAFC]'
                    }`}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-md bg-orange-500 overflow-hidden">
                      {session.user?.avatarUrl ? (
                        <Image
                          src={session.user.avatarUrl}
                          alt="avatar"
                          className="w-full h-full object-cover"
                          width={500}
                          height={500}
                        />
                      ) : (
                        session.user?.firstName.charAt(0).toUpperCase() || '?'
                      )}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3
                          className={`text-[14px] font-bold truncate ${isSelected ? 'text-[#D35400]' : 'text-[#2D3436]'}`}>
                          {session.user?.firstName} {session.user?.lastName}
                        </h3>
                        <span
                          className={`text-[10px] font-bold whitespace-nowrap uppercase tracking-wider ${unread > 0 ? 'text-orange-500' : 'text-[#A0AEC0]'}`}>
                          {dayjs(previewTime).format('h:mm A')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <p
                          className={`text-xs truncate leading-tight ${unread > 0 ? 'text-[#2D3436] font-bold' : 'text-[#718096] font-medium'}`}>
                          {previewMessage}
                        </p>
                        {unread > 0 && (
                          <div className="bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm animate-in zoom-in duration-300">
                            {unread > 9 ? '9+' : unread}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* --- Right Main Area: Active Chat Window --- */}
        <div className="flex-1 flex flex-col bg-white">
          {activeSession ? (
            <>
              {/* Chat Window Header */}
              <div className="px-8 py-5 border-b border-[#EDF2F7] flex items-center gap-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="w-11 h-11 rounded-full bg-[#FF793F] flex items-center justify-center text-white font-bold shadow-lg shadow-orange-100 overflow-hidden">
                  {activeSession.user?.avatarUrl ? (
                    <Image
                      src={activeSession.user.avatarUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                    />
                  ) : (
                    activeSession.user?.firstName.charAt(0).toUpperCase() || '?'
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1E272E] tracking-tight">
                    {activeSession.user?.firstName}{' '}
                    {activeSession.user?.lastName}
                  </h3>
                </div>
              </div>

              {/* Chat Messages Scrolling Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#FAFAFA]/50 relative">
                {historyLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="animate-spin text-orange-500" />
                  </div>
                ) : (
                  history?.map((msg: ChatMessage, idx: number) => (
                    <div
                      key={msg.id || idx}
                      className={`flex flex-col gap-2 max-w-[80%] ${msg.sender === 'AGENT' ? 'items-end ml-auto' : 'items-start'}`}>
                      <div
                        className={`px-6 py-2 rounded-2xl shadow-sm border ${
                          msg.sender === 'AGENT'
                            ? 'bg-[#EBF8FF] rounded-tr-none border-[#BEE3F8] text-[#2C5282] font-semibold'
                            : 'bg-white rounded-tl-none border-[#EDF2F7] text-[#2D3436] font-medium'
                        }`}>
                        <p className="text-[14px] leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#A0AEC0] font-bold uppercase tracking-tight">
                        {dayjs(msg.createdAt).format('MMM D, h:mm A')}
                      </span>
                    </div>
                  ))
                )}

                {isOpponentTyping && (
                  <div className="flex items-center gap-3 absolute bottom-6 left-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex gap-1.5 bg-white px-4 py-2.5 rounded-full border border-orange-100 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest italic drop-shadow-sm">
                      Patient is typing...
                    </span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer Area */}
              <div className="p-8 border-t border-[#EDF2F7] bg-white">
                <form
                  onSubmit={handleSend}
                  className="flex gap-4 items-center max-w-5xl mx-auto">
                  <div className="flex-1 relative group">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Type your message..."
                      className="w-full bg-[#F8FAFC] border-2 border-[#EDF2F7] rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-[#FF793F]/40 focus:ring-4 focus:ring-[#FF793F]/5 focus:bg-white transition-all placeholder:text-[#A0AEC0] font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isSending}
                    className="bg-[#FF793F] hover:bg-[#E66733] text-white p-4 rounded-2xl transition-all shadow-xl shadow-orange-100 active:scale-95 group flex items-center justify-center disabled:opacity-50 disabled:shadow-none">
                    {isSending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-10 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
                <Search className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-600">
                Select a conversation
              </h3>
              <p className="text-sm max-w-xs mt-1">
                Choose a chat from the sidebar to start messaging with patients.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportChatPage;
