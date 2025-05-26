'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: string;
  content: string;
  ttft?: number; // Time to first token in milliseconds
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ttft, setTtft] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const requestStartTimeRef = useRef<number | null>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', content: input }]);
    setLoading(true);
    requestStartTimeRef.current = Date.now();

    const controller = new AbortController();
    abortRef.current = controller;

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: input }),
      signal: controller.signal,
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    let aiMsg = '';
    let firstTokenReceived = false;
    setMessages((msgs) => [...msgs, { role: 'assistant', content: '' }]);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      if (value) {
        const chunk = new TextDecoder().decode(value);
        if (!firstTokenReceived && chunk.trim()) {
          firstTokenReceived = true;
          const ttft = Date.now() - (requestStartTimeRef.current || Date.now());
          setTtft(ttft);
          setMessages((msgs) =>
            msgs.map((msg, i) =>
              i === msgs.length - 1
                ? { ...msg, content: aiMsg + chunk, ttft }
                : msg
            )
          );
        } else {
          aiMsg += chunk;
          setMessages((msgs) =>
            msgs.map((msg, i) =>
              i === msgs.length - 1
                ? { ...msg, content: aiMsg }
                : msg
            )
          );
        }
      }
    }
    setLoading(false);
    setInput('');
    requestStartTimeRef.current = null;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="w-full max-w-2xl flex flex-col flex-1 rounded-xl shadow-lg border border-gray-200 bg-white mt-10 mb-6 overflow-hidden">
        {/* Stats Display */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              {ttft !== null ? (
                <span className="flex items-center gap-2">
                  <span className="font-medium">TTFT:</span>
                  <span className={`${ttft < 1000 ? 'text-green-600' : ttft < 2000 ? 'text-yellow-600' : 'text-red-600'} font-mono`}>
                    {ttft}ms
                  </span>
                </span>
              ) : (
                <span className="text-gray-400">No response yet</span>
              )}
            </div>
            <div className="text-gray-400 text-xs">
              Powered by RunPod + Vercel + OpenAI SDK
            </div>
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
          style={{ minHeight: 500, maxHeight: 700 }}
        >
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              Start the conversation!
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] px-4 py-3 rounded-2xl shadow-sm
                  ${msg.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200'}
                  whitespace-pre-wrap break-words
                `}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm prose-slate dark:prose-invert">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                    {msg.ttft && (
                      <div className="text-xs text-gray-500 mt-2">
                        Time to first token: {msg.ttft}ms
                      </div>
                    )}
                  </div>
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl shadow-sm animate-pulse">
                ...
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2 border-t border-gray-200 bg-white px-4 py-3"
        >
          <input
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            placeholder="Type your message..."
            autoFocus
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
} 