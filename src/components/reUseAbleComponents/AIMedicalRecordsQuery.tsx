'use client';
import { Search, Sparkles, Loader2, User, Bot, X } from 'lucide-react';
import { useState } from 'react';
import { useAiQueryMutation } from '@/redux/api/patient.api';
import { toast } from 'sonner';
import { useAppSelector } from '@/redux/hooks';

import ReactMarkdown from 'react-markdown';
import { useStreamingText } from '@/hooks/useStreamingText';
import { processMedicalContent } from '@/lib/highlightMedicalText';

// ── Blinking cursor shown while streaming ──────────────────────────────────
const BlinkingCursor = () => (
  <span className="inline-block w-0.5 h-[1em] bg-secondary align-middle ml-0.5 animate-[blink_0.7s_step-end_infinite]" />
);

export function AIMedicalRecordsQuery() {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const patientId = useAppSelector((state) => state.patient.selectedPatientId);

  const [performAiQuery, { isLoading }] = useAiQueryMutation();

  // Stream the text character-by-character
  const { displayedText, isStreaming } = useStreamingText(aiResponse || '', 14);

  const handleAsk = async () => {
    const text = query.trim();
    if (!text) return;


    if (!patientId) {
      toast.error('No patient profile found to query.');
      return;
    }

    try {
      const res = await performAiQuery({ patientId, message: text }).unwrap();
      if (res.success) {
        setAiResponse(res.data.message);
        setLastQuery(text);
        setQuery('');
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || 'Failed to get AI response');
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 w-full transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Sparkles className="text-secondary h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 font-arimo">
            AI Medical Assistant
          </h3>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-neutral-600 font-arimo mb-5">
          Ask questions about your medical history, medications, or past visits in natural language.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="e.g., What medications am I on?"
              className="w-full px-4 py-3 bg-neutral-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary font-arimo text-base text-gray-700 placeholder-gray-400 transition-all"
            />
          </div>
          <button
            onClick={handleAsk}
            disabled={isLoading || !query.trim()}
            className="px-8 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-gray-300 cursor-pointer text-white font-semibold font-inter text-base rounded-xl shadow-md shadow-secondary/20 transition-all flex items-center justify-center gap-2 min-w-[120px]">
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Ask AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Response Display */}
      {aiResponse && (
        <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-orange-50/50 px-6 py-3 border-b border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-700">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Insight</span>
            </div>
            <button
              onClick={() => setAiResponse(null)}
              className="text-rose-400 hover:text-rose-600 text-xs font-medium cursor-pointer flex items-center gap-1"
            >
              <X className='h-4 w-4' />  Clear
            </button>
          </div>
          <div className="p-6">
            <div className="flex gap-4 items-start mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-gray-700 font-medium pt-1 italic">&quot;{lastQuery}&quot;</p>
            </div>

            <div className="flex gap-4 items-start bg-neutral-50 p-5 rounded-2xl border border-gray-100">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="space-y-3 pt-1 w-full overflow-hidden">
                <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed font-arimo">
                  <ReactMarkdown
                    components={{
                      ul: ({ children }) => (
                        <ul className="list-disc ml-6 space-y-2 my-3">{children}</ul>
                      ),
                      li: ({ children }) => <li className="pl-1">{processMedicalContent(children)}</li>,
                      strong: ({ children }) => (
                        <strong className="font-bold text-neutral-900">
                          {processMedicalContent(children)}
                        </strong>
                      ),
                      p: ({ children }) => (
                        <p className="mb-3 last:mb-0">
                          {processMedicalContent(children)}



                        </p>
                      ),
                      h1: ({ children }) => <h1 className="text-lg font-bold mb-4 mt-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-base font-bold mb-3 mt-2">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-sm font-bold mb-2 mt-1">{children}</h3>,
                    }}
                  >
                    {displayedText}
                  </ReactMarkdown>

                  {/* Blinking cursor shown while streaming */}
                  {isStreaming && <BlinkingCursor />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
