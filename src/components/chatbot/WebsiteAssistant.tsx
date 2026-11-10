import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Bot,
  User,
} from 'lucide-react';
import { SUGGESTED_PROMPTS, knowledgeBase } from '../../services/assistant/knowledgeBase';
import type { AssistantMessage } from '../../types';

let messageCounter = 0;
const getNextMessageId = (prefix: string) => `${prefix}-${++messageCounter}`;

export const WebsiteAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "👋 Hi there! I'm Benedict's automated website assistant. I can help explain his development services, guide project scoping, or help you submit an inquiry for a quotation.",
      timestamp: 'Just now',
      options: [
        { label: 'What services do you offer?', action: 'quick_reply', payload: 'What services do you offer?' },
        { label: 'Can you build a custom management system?', action: 'quick_reply', payload: 'Can you build a custom business management system?' },
        { label: 'How much does a project cost?', action: 'quick_reply', payload: 'How much does a website cost?' },
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: AssistantMessage = {
      id: getNextMessageId('user'),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Realistic assistant response pacing
    setTimeout(() => {
      const response = knowledgeBase.respond(query);
      const assistantMsg: AssistantMessage = {
        id: getNextMessageId('assistant'),
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: response.suggestedActions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action: string, payload?: string) => {
    if (action === 'navigate' && payload) {
      setIsOpen(false);
      navigate(payload);
    } else if (action === 'quick_reply' && payload) {
      handleSend(payload);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: getNextMessageId('welcome'),
        sender: 'assistant',
        text: "Conversation reset. How can I help you regarding Benedict's software engineering services today?",
        timestamp: 'Just now',
        options: [
          { label: 'What services do you offer?', action: 'quick_reply', payload: 'What services do you offer?' },
          { label: 'How does your process work?', action: 'quick_reply', payload: 'How does your development process work?' },
          { label: 'Request a Quotation', action: 'navigate', payload: '/contact' },
        ],
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 text-white shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:scale-105 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Open assistant chat"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:rotate-6 transition-transform" />
          <span className="text-sm font-medium pr-1">Ask Assistant</span>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3.5 flex items-center justify-between text-white border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold flex items-center gap-1.5">
                  Project Guide
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                    Automated
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Answers inquiries & scopes requirements</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                title="Restart conversation"
                aria-label="Reset chat history"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                aria-label="Close assistant chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-slate-50 border-b border-slate-100 px-3 py-2 overflow-x-auto flex gap-1.5 no-scrollbar">
            {SUGGESTED_PROMPTS.slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => handleSend(p.trigger)}
                className="whitespace-nowrap px-2.5 py-1 text-xs rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-colors flex-shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-1' : 'order-2'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Action buttons inside assistant messages */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {msg.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(opt.action, opt.payload)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                          >
                            <span>{opt.label}</span>
                            <ArrowRight className="w-3 h-3 text-emerald-600" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 px-1 mt-1 block">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs order-2">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center text-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-150"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about systems, pricing, or tech..."
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-slate-900 text-white disabled:opacity-40 hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick CTA footer */}
          <div className="bg-slate-50 px-3 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              Ready to build?
            </span>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/contact');
              }}
              className="font-medium text-emerald-700 hover:underline flex items-center gap-0.5"
            >
              <span>Submit Project Inquiry</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
