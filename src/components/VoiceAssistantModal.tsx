import React, { useState, useEffect, useRef } from 'react';
import { 
  ChatMessage, 
  BranchId, 
  BranchInfo, 
  MenuItem, 
  RestaurantOrder, 
  TableReservation, 
  ComplaintTicket 
} from '../types';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  X, 
  Sparkles, 
  ShoppingBag, 
  Calendar, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBranch: BranchId;
  branches: Record<BranchId, BranchInfo>;
  menuItems: MenuItem[];
  orders: RestaurantOrder[];
  onAddToCartDirect: (item: MenuItem, qty: number) => void;
  onBookTableDirect: (reservation: Partial<TableReservation>) => void;
  onLogTicketDirect: (ticket: Partial<ComplaintTicket>) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentBranch,
  branches,
  menuItems,
  orders,
  onAddToCartDirect,
  onBookTableDirect,
  onLogTicketDirect
}) => {
  const branch = branches[currentBranch];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Assalam-o-Alaikum & Khush Amdeed! I am Urban Dost, your AI restaurant assistant for Urban Tandoor & Grill (${branch.name}). I can take your food order, check live ingredient availability, book a table, track active kitchen tickets, or apply the 10% bank discount. How may I serve you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Web Speech API Voice Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type your request.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Speech recognition start error:', err);
      }
    }
  };

  const speakText = (text: string) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputText).trim();
    if (!message) return;

    setInputText('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Call server backend
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          branchId: currentBranch,
          history: messages.slice(-4)
        })
      });

      let reply = '';
      if (res.ok) {
        const data = await res.json();
        reply = data.reply;
      } else {
        reply = generateSmartLocalReply(message);
      }

      // Check if message corresponds to specific actions (order item, track, reserve)
      const actionData = analyzeIntentAndGenerateAction(message);

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionData
      };

      setMessages(prev => [...prev, assistantMsg]);
      speakText(reply);
    } catch (err) {
      console.warn('Backend request failed, using intelligent fallback:', err);
      const reply = generateSmartLocalReply(message);
      const actionData = analyzeIntentAndGenerateAction(message);

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionData
      };
      setMessages(prev => [...prev, assistantMsg]);
      speakText(reply);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSmartLocalReply = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes('karahi') || lower.includes('desi')) {
      return `Our Desi Chicken Karahi is seasoned with fresh ginger juliennes and crushed black pepper. We also have tender boneless Chicken White Handi. Would you like me to add it to your order?`;
    }
    if (lower.includes('bbq') || lower.includes('tikka') || lower.includes('malai boti') || lower.includes('kabab')) {
      return `Our babul charcoal pit is glowing! Our Chicken Malai Boti and Royal Beef Seekh Kababs are our top recommended grill items tonight.`;
    }
    if (lower.includes('track') || lower.includes('utg-')) {
      return `I can help you track that immediately! Looking up your active order in the Karachi kitchen queue.`;
    }
    if (lower.includes('table') || lower.includes('reserve')) {
      return `We have 2-person, 4-person, 7-person, and group banquet tables available at ${branch.name}. Let me know your party size and preferred time!`;
    }
    if (lower.includes('discount') || lower.includes('bank') || lower.includes('card')) {
      return `You can enjoy a 10% instant discount on eligible cards from HBL, Meezan, Bank Alfalah, and Standard Chartered (up to PKR 500 off) during checkout!`;
    }
    return `Certainly! At Urban Tandoor & Grill, we operate 24/7. How may I assist you with our multi-cuisine menu, table booking, or pre-orders?`;
  };

  const analyzeIntentAndGenerateAction = (msg: string): ChatMessage['actionData'] => {
    const lower = msg.toLowerCase();
    
    // Check if user is asking for specific dishes
    const matchedItems = menuItems.filter(item => 
      lower.includes(item.name.toLowerCase()) || 
      lower.includes(item.category.toLowerCase().split(' ')[0])
    );

    if (matchedItems.length > 0) {
      return {
        suggestedItems: matchedItems.slice(0, 2)
      };
    }

    // Check tracking
    const orderMatch = orders.find(o => lower.includes(o.orderNumber.toLowerCase()));
    if (orderMatch) {
      return {
        trackingOrder: orderMatch
      };
    }

    return undefined;
  };

  const quickPrompts = [
    'Recommend top BBQ items for tonight',
    'I want 1 Chicken Karahi and 2 Naan',
    'Book a table for 4 at 9:00 PM',
    'How does the 10% Bank Discount work?',
    'Track my order UTG-1041',
    'Lodge a service complaint'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-2xl h-[88vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Assistant Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-950/50">
                <Bot className="w-6 h-6 text-stone-950" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-950"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-base text-white">Urban Dost AI</h2>
                <span className="text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md font-semibold">
                  Voice &amp; Multi-lingual
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                AI Host at {branch.name} · 24/7 Real-Time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (isSpeaking) window.speechSynthesis.cancel();
                setTtsEnabled(!ttsEnabled);
              }}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                ttsEnabled ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
              title={ttsEnabled ? 'Mute AI Voice Output' : 'Enable AI Voice Output'}
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none shadow-md shadow-amber-950/20'
                    : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Attached Interactive Action Cards */}
                {msg.actionData?.suggestedItems && msg.actionData.suggestedItems.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-800/80 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      Recommended Dishes
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.actionData.suggestedItems.map(item => (
                        <div 
                          key={item.id}
                          className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate text-[11px]">{item.name}</p>
                            <p className="text-[10px] text-amber-400 font-mono">PKR {item.price.toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => onAddToCartDirect(item, 1)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[10px]"
                          >
                            + Bag
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {msg.actionData?.trackingOrder && (
                  <div className="mt-3 p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{msg.actionData.trackingOrder.orderNumber}</span>
                      <span className="text-amber-400 font-semibold uppercase">{msg.actionData.trackingOrder.status}</span>
                    </div>
                    <p className="text-stone-400">
                      ETA: {msg.actionData.trackingOrder.estimatedReadyTime} · {msg.actionData.trackingOrder.items.length} items
                    </p>
                  </div>
                )}
              </div>

              <span className="text-[10px] text-stone-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-stone-400 text-xs py-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-200"></div>
              <span>Urban Dost is checking kitchen inventory...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 border-t border-stone-800/80 bg-stone-950/40 overflow-x-auto scrollbar-none flex gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input & Voice Controls Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center gap-2">
          {/* Microphone button */}
          <button
            onClick={toggleListening}
            className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-950/50'
                : 'bg-stone-900 border border-stone-800 text-amber-400 hover:text-amber-300 hover:bg-stone-800'
            }`}
            title={isListening ? 'Listening... Click to stop' : 'Click to Speak via Microphone'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={isListening ? 'Listening to your voice...' : 'Ask about dishes, book a table, or track orders...'}
              className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-100 placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Send button */}
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold transition-all shadow-md active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
