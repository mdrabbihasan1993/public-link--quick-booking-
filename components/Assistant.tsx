
import React, { useState, useRef, useEffect } from 'react';
import { getLogisticsAssistantResponse } from '../services/geminiService';
import { Icons, BRAND_BLUE, BRAND_ORANGE } from '../constants';

interface AssistantProps {
  parcelContext: any;
}

const Assistant: React.FC<AssistantProps> = ({ parcelContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;
    
    const userMsg = query;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setIsLoading(true);

    const aiResponse = await getLogisticsAssistantResponse(userMsg, parcelContext);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-200 mb-6 overflow-hidden flex flex-col h-[550px] animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-brandBlue p-6 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brandOrange flex items-center justify-center shadow-inner">
                <Icons.Package />
              </div>
              <div>
                <span className="font-bold block">Logistics Intelligence</span>
                <span className="text-[10px] opacity-60 uppercase tracking-widest font-black">7 Ton AI Expert</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-4 bg-bgGray">
            {messages.length === 0 && (
              <div className="text-center mt-20 opacity-40">
                <div className="mb-4 flex justify-center"><Icons.Package /></div>
                <p className="text-brandBlue font-semibold text-sm px-6">Ready to optimize your logistics operations. Ask me about your parcels.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-brandBlue text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none font-medium'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-brandOrange rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-brandOrange rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2.5 h-2.5 bg-brandOrange rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask logistics query..."
                className="flex-1 bg-white border-2 border-slate-100 rounded-2xl px-5 py-3 text-sm focus:border-brandBlue focus:ring-0 outline-none shadow-inner transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-brandOrange text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-[#e6661a] transition-all shadow-lg active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-brandBlue text-white rounded-3xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all active:scale-95 group relative border-4 border-white"
      >
        <Icons.MessageCircle />
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-brandOrange rounded-full border-4 border-white flex items-center justify-center shadow-md"></span>
      </button>
    </div>
  );
};

export default Assistant;
