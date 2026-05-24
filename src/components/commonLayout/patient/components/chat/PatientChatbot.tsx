'use client';

import React, {useState, useRef, useEffect, useMemo} from 'react';
import {X, Send, Loader2} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import ChatBot from '@/shared/Logo/chatBotLogo';
import {useAppSelector} from '@/redux/hooks';
import {
  useCreateChatSessionMutation,
  useGetChatHistoryQuery,
  useGetChatSessionsQuery,
  useSendMessageMutation,
  type ChatMessage,
} from '@/redux/api/chat.api';
import {useStreamingText} from '@/hooks/useStreamingText';

const chatConfig = {
  positions: {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
  },
};

interface PatientChatbotProps {
  position?: 'bottom-right' | 'bottom-left';
  className?: string;
}

function messageToRole(sender: string): 'user' | 'bot' {
  return sender === 'USER' ? 'user' : 'bot';
}

// ── Blinking cursor ────────────────────────────────────────────────────────
const BlinkingCursor = () => (
  <span className="inline-block w-0.5 h-[1em] bg-foreground/60 align-middle ml-0.5 animate-[blink_0.7s_step-end_infinite]" />
);

// ── Bot bubble — streams only when isNew=true ──────────────────────────────
function BotBubble({content, isNew}: {content: string; isNew: boolean}) {
  const {displayedText, isStreaming} = useStreamingText(
    isNew ? content : '',
    14,
  );

  const text = isNew ? displayedText : content;

  return (
    <div className="bg-white shadow-sm rounded-2xl rounded-bl-none border max-w-[80%] px-4 py-3 text-sm">
      {text}
      {isNew && isStreaming && <BlinkingCursor />}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PatientChatbot({
  position = 'bottom-right',
  className,
}: PatientChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(
    null,
  );

  // IDs seen when chat first opened — useState so we never read it during render via ref
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const historyInitializedRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.auth.user);

  const [createSession] = useCreateChatSessionMutation();
  const [sendMessage, {isLoading: isSending}] = useSendMessageMutation();

  const {data: sessions = [], isLoading: sessionsLoading} =
    useGetChatSessionsQuery(undefined, {skip: !isOpen});

  const {data: history = []} = useGetChatHistoryQuery(sessionId!, {
    skip: !sessionId,
  });

  // Ensure we have an ASSISTANT session when chat opens
  useEffect(() => {
    if (!isOpen || sessionsLoading || !user) return;

    const existing = sessions.find(
      (s) => s.type === 'ASSISTANT' && s.status === 'OPEN',
    );
    if (existing) {
      queueMicrotask(() => setSessionId(existing.id));
      return;
    }
    createSession({type: 'ASSISTANT'})
      .unwrap()
      .then((session) => setSessionId(session.id))
      .catch(() => setSessionId(null));
  }, [isOpen, user, sessionsLoading, sessions, createSession]);

  // First time history loads → snapshot all existing IDs as "seen" (old messages)
  useEffect(() => {
    if (historyInitializedRef.current || history.length === 0) return;
    const ids = new Set<string>();
    history.forEach((m: ChatMessage) => {
      if (m.id) ids.add(m.id);
    });
    setSeenIds(ids);
    historyInitializedRef.current = true;
  }, [history]);

  // Reset everything when chat closes
  useEffect(() => {
    if (!isOpen) {
      historyInitializedRef.current = false;
      setSeenIds(new Set());
      setSessionId(null);
    }
  }, [isOpen]);

  // Build messages array
  const messages = useMemo(() => {
    return history.map((m: ChatMessage) => ({
      id: m.id,
      role: messageToRole(m.sender),
      content: m.message,
    }));
  }, [history]);

  // Append optimistic user message while waiting
  const allMessages = useMemo(() => {
    if (!pendingUserMessage) return messages;
    return [
      ...messages,
      {role: 'user' as const, content: pendingUserMessage, id: undefined},
    ];
  }, [messages, pendingUserMessage]);

  // The newest bot message NOT in seenIds → this one streams
  const streamingMessageId = useMemo(() => {
    const newBotMessages = messages.filter(
      (msg) => msg.role === 'bot' && msg.id && !seenIds.has(msg.id),
    );
    return newBotMessages.at(-1)?.id ?? null;
  }, [messages, seenIds]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [allMessages.length]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || !sessionId || isSending) return;
    setPendingUserMessage(text);
    setInputValue('');
    try {
      await sendMessage({sessionId, message: text}).unwrap();
      setPendingUserMessage(null);
    } catch {
      setPendingUserMessage(null);
      setInputValue(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isLoadingSession = isOpen && !!user && (sessionsLoading || !sessionId);
  const isEmpty = allMessages.length === 0;

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed z-9999 shadow-xl flex rounded-full items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95',
          chatConfig.positions[position],
          isOpen
            ? 'bg-sidebar-foreground hover:bg-sidebar-foreground text-background'
            : 'bg-primary hover:bg-primary/90 text-sidebar-foreground',
          className,
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}>
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <div className="bg-sidebar-foreground rounded-full hover:bg-sidebar-foreground text-foreground">
            <ChatBot />
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed z-9998 transition-all duration-300 ease-out pointer-events-none',
          isOpen
            ? 'pointer-events-auto opacity-100 scale-100'
            : 'opacity-0 scale-95',
          'bottom-0 left-0 right-0 sm:bottom-24 sm:left-auto sm:right-6 sm:w-96 sm:h-150 sm:rounded-2xl',
          'bg-background border shadow-2xl overflow-hidden flex flex-col',
        )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-linear-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="bg-sidebar-foreground rounded-full hover:bg-sidebar-foreground text-foreground">
              <ChatBot />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Mojacares Assistant</h3>
              <p className="text-xs text-muted-foreground">
                Online • Helps 24/7
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-5 overflow-y-auto bg-slate-50/50">
          {isLoadingSession ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <Loader2 className="h-10 w-10 animate-spin mb-4" />
              <p className="text-sm">Starting chat...</p>
            </div>
          ) : isEmpty ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <div className="w-16 h-16 mb-4 opacity-70">
                <ChatBot />
              </div>
              <p className="text-lg font-medium mb-2">
                Hello! How can I help you today?
              </p>
              <p className="text-sm max-w-xs">
                Ask anything about appointments, health services, billing, or
                general questions.
              </p>
            </div>
          ) : (
            <>
              {allMessages.map((msg, idx) => (
                <div
                  key={msg.id ?? `msg-${idx}`}
                  className={cn(
                    'mb-4 flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start',
                  )}>
                  {msg.role === 'user' ? (
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl text-sm bg-primary text-primary-foreground rounded-br-none">
                      {msg.content}
                    </div>
                  ) : (
                    <BotBubble
                      content={msg.content}
                      isNew={!!msg.id && msg.id === streamingMessageId}
                    />
                  )}
                </div>
              ))}

              {/* Typing indicator while waiting for bot reply */}
              {isSending && (
                <div className="mb-4 flex justify-start">
                  <div className="bg-white shadow-sm rounded-2xl rounded-bl-none border px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 rounded-full px-5 py-6 text-base"
              disabled={!sessionId}
            />
            <Button
              onClick={() => handleSend()}
              size="icon"
              className="h-12 w-12 rounded-full bg-secondary text-background"
              disabled={!inputValue.trim() || !sessionId || isSending}>
              {isSending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Type your question • We typically reply instantly
          </p>
        </div>
      </div>
    </>
  );
}
