'use client';

import { useState, useRef } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', content: input }]);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: input }),
      signal: controller.signal,
    });

    const data = await res.json();
    setMessages((msgs) => [
      ...msgs,
      { role: 'assistant', content: data.output || 'No response.' }
    ]);
    setLoading(false);
    setInput('');
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Chat with LLM</h1>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-200' : 'bg-green-100'}`}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <span className="inline-block px-3 py-2 rounded-lg bg-green-100 animate-pulse">
              ...
            </span>
          </div>
        )}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex space-x-2"
      >
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
} 