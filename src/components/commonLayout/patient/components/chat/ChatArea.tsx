'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Loader2, Send} from 'lucide-react';
import {
  useCreateChatSessionMutation,
  useGetChatHistoryQuery,
  useGetChatSessionsQuery,
  useSendMessageMutation,
  type ChatMessage,
  chatApi,
} from '@/redux/api/chat.api';
import {useSocket} from '@/hooks/useSocket';
import {useAppDispatch} from '@/redux/hooks';
import dayjs from 'dayjs';
import Image from 'next/image';

function messageToRole(sender: string): 'user' | 'bot' {
  return sender === 'USER' ? 'user' : 'bot';
}

export const ChatArea = forwardRef((_props, ref) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(
    null,
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Track processed WebSocket message IDs to avoid double-processing
  const processedMessageIdsRef = useRef<Set<string>>(new Set());

  const dispatch = useAppDispatch();

  const [createSession] = useCreateChatSessionMutation();
  const [sendMessage, {isLoading: isSending}] = useSendMessageMutation();

  const {data: sessions = [], isLoading: sessionsLoading} =
    useGetChatSessionsQuery(undefined);

  const {data: history = [], isLoading: historyLoading} =
    useGetChatHistoryQuery(sessionId!, {
      skip: !sessionId,
    });

  // --- WebSocket Hook Integration ---
  const {lastMessage, isOpponentTyping, sendTyping} = useSocket(sessionId);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    sendTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendTyping(false);
    }, 2000);
  };

  // Sync WebSocket messages with RTK Query cache instead of local state
  useEffect(() => {
    if (lastMessage && lastMessage.sessionId === sessionId) {
      if (processedMessageIdsRef.current.has(lastMessage.id)) return;
      processedMessageIdsRef.current.add(lastMessage.id);

      dispatch(
        chatApi.util.updateQueryData(
          'getChatHistory',
          sessionId,
          (draft: ChatMessage[]) => {
            if (!draft.some((m: ChatMessage) => m.id === lastMessage.id)) {
              draft.push(lastMessage);
            }
          },
        ),
      );
    }
  }, [lastMessage, sessionId, dispatch]);

  useEffect(() => {
    if (sessionsLoading) return;
    const existing = sessions.find(
      (s: any) => s.type === 'SUPPORT' && s.status === 'OPEN',
    );
    if (existing) {
      queueMicrotask(() => setSessionId(existing.id));
      return;
    }
    createSession({type: 'SUPPORT'})
      .unwrap()
      .then((session: any) => setSessionId(session.id))
      .catch(() => setSessionId(null));
  }, [sessionsLoading, sessions, createSession]);

  const messages: Array<{
    role: 'user' | 'bot';
    content: string;
    id?: string;
    createdAt?: string;
  }> = [];

  // Use history data directly for rendering
  history.forEach((m: ChatMessage) => {
    messages.push({
      id: m.id,
      role: messageToRole(m.sender),
      content: m.message,
      createdAt: m.createdAt,
    });
  });

  if (pendingUserMessage) {
    messages.push({
      role: 'user',
      content: pendingUserMessage,
      createdAt: new Date().toISOString(),
    });
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages.length, isOpponentTyping]);

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride || inputValue).trim();
    if (!text || !sessionId || isSending) return;

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    sendTyping(false);

    setPendingUserMessage(text);
    if (!textOverride) setInputValue('');

    try {
      await sendMessage({sessionId, message: text}).unwrap();
      setPendingUserMessage(null);

      // Auto-reply logic for Quick Help
      const lowerText = text.toLowerCase();
      const botMessages = {
        'book an appointment':
          'You can book an appointment by going to the “Request Care” section in your dashboard and clicking “New Care Request.” Then select the required services, date, and time. After that, confirm the appointment by completing the payment. Once confirmed, a staff member will be assigned to your care.',
        'download reports':
          "All medical reports and your AI-driven health insights can be found in the 'Medical Records' section of your dashboard.",
        'methods of payment':
          'We offer secure payments through Paystack, supporting both card and local payment methods. Before confirming any non-emergency service, you’ll receive a clear cost estimate and receipt. You can choose flexible payment options — pay-as-you-go for occasional care or subscription plans for continuous support and peace of mind.',
        'emergency':
          'For immediate medical emergencies, please call your local emergency services (999/112). For 24/7 support from our team, you can call +233 53 702 3090 or email us at support@mojacares.com',
      };

      const matchedKey = Object.keys(botMessages).find((k) =>
        lowerText.includes(k),
      );
      if (matchedKey) {
        const botReply = {
          id: 'bot-' + Date.now(),
          sessionId: sessionId,
          sender: 'AGENT',
          message: botMessages[matchedKey as keyof typeof botMessages],
          createdAt: new Date().toISOString(),
        } as any;

        setTimeout(() => {
          dispatch(
            chatApi.util.updateQueryData(
              'getChatHistory',
              sessionId,
              (draft: ChatMessage[]) => {
                draft.push(botReply);
              },
            ),
          );
        }, 1000);
      }
    } catch {
      setPendingUserMessage(null);
      if (!textOverride) setInputValue(text);
    }
  };

  useImperativeHandle(ref, () => ({
    sendExternalMessage: (text: string) => {
      handleSend(text);
    },
  }));

  const isLoadingSession = sessionsLoading || (!sessionId && !sessions.length);
  const isEmpty = messages.length === 0 && !pendingUserMessage;

  return (
    <Card className="flex flex-col h-[calc(100vh-140px)] min-h-125 shadow-lg">
      <div className="border-b p-4 flex items-center justify-between ">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <Image
              src="/customer-service.png"
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              ST
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Support Team</h3>
          </div>
        </div>
      </div>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background relative">
        {isLoadingSession ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin mb-4" />
            <p className="text-sm">Starting chat...</p>
          </div>
        ) : isEmpty ? (
          <div className="flex gap-3 max-w-[80%]">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="bg-muted">ST</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="rounded-lg rounded-tl-none bg-muted p-3 text-sm">
                Hello! How can I help you today?
              </div>
              <div className="text-xs text-muted-foreground pl-1">Just now</div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) =>
              msg.role === 'user' ? (
                <div
                  key={msg.id ?? `u-${idx}`}
                  className="flex gap-3 max-w-[80%] ml-auto justify-end">
                  <div className="space-y-1 text-right">
                    <div className="rounded-lg rounded-tr-none bg-primary text-primary-foreground p-3 text-sm">
                      {msg.content}
                    </div>
                    {msg.createdAt && (
                      <div className="text-[10px] text-muted-foreground px-1 font-medium">
                        {dayjs(msg.createdAt).format('MMM D, h:mm A')}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id ?? `b-${idx}`}
                  className="flex gap-3 max-w-[80%]">
                  <Avatar className="h-8 w-8 mt-1">
                    <Image
                      src="/customer-support.jpg"
                      alt="Logo"
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </Avatar>
                  <div className="space-y-1">
                    <div className="rounded-lg rounded-tl-none bg-muted p-3 text-sm">
                      {msg.content}
                    </div>
                    {msg.createdAt && (
                      <div className="text-[10px] text-muted-foreground px-1 font-medium">
                        {dayjs(msg.createdAt).format('MMM D, h:mm A')}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}

            {isOpponentTyping && (
              <div className="flex items-center gap-3 max-w-[80%] animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-muted text-[10px]">
                    ST
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-1 bg-muted px-3 py-2 rounded-lg rounded-tl-none">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t p-4 ">
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
            disabled={!sessionId}
          />
          <Button
            type="submit"
            size="icon"
            className=" bg-secondary/70 hover:bg-secondary/70"
            disabled={!inputValue.trim() || !sessionId || isSending}>
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin text-background" />
            ) : (
              <Send className="h-5 w-5 text-background" />
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
});
