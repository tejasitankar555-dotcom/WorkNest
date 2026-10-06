import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  CheckCheck, 
  Users, 
  Briefcase, 
  User, 
  FileText,
  Sparkles
} from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    currentUser 
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const currentConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(currentConv.id, inputText);
    setInputText('');
  };

  const handleSimulateAttachment = () => {
    sendMessage(currentConv.id, 'Attached architectural diagram & test payload.', 'architecture-flow-v3.png');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[720px]">
        
        {/* Left: Conversations list */}
        <div className="border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 space-y-3">
            <h2 className="text-base font-bold text-slate-900">WorkNest Messages</h2>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FF5520]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map((conv) => {
              const isActive = conv.id === currentConv.id;
              const otherPerson = conv.participants.find(p => p.id !== currentUser.id) || conv.participants[0];

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                    isActive ? 'bg-orange-50/60 border-l-4 border-[#FF5520]' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={otherPerson.avatar} alt={otherPerson.name} className="w-10 h-10 rounded-full object-cover" />
                    {otherPerson.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {conv.type === 'team' ? 'Squad: Full-Stack AI Pioneers' : otherPerson.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate leading-relaxed">
                      {conv.lastMessage}
                    </p>

                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-200/80 text-slate-700">
                        {conv.type}
                      </span>
                      {conv.projectTitle && (
                        <span className="text-[10px] text-slate-400 truncate">
                          • {conv.projectTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Window (2 cols) */}
        <div className="md:col-span-2 flex flex-col h-full bg-white">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-3">
              <img
                src={currentConv.participants.find(p => p.id !== currentUser.id)?.avatar || currentConv.participants[0].avatar}
                alt="Partner"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  {currentConv.type === 'team' 
                    ? 'Full-Stack AI Pioneers (Team Chat)' 
                    : (currentConv.participants.find(p => p.id !== currentUser.id)?.name || 'Partner')}
                </h3>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online • Escrow Protected Channel
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={handleSimulateAttachment}
                className="border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                title="Simulate file sharing"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send Deliverable</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentConv.messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}
                >
                  <img src={msg.senderAvatar} alt={msg.senderName} className="w-7 h-7 rounded-full object-cover shrink-0" />
                  
                  <div className={`max-w-[75%] rounded-2xl p-3.5 text-xs space-y-1 ${
                    isMe
                      ? 'bg-[#FF5520] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-900 border border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between gap-3 text-[10px] opacity-80">
                      <span className="font-semibold">{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                    {msg.attachments && (
                      <div className="pt-2 border-t border-white/20 mt-2 space-y-1">
                        {msg.attachments.map((att, idx) => (
                          <div key={idx} className="p-2 bg-black/10 rounded-lg flex items-center gap-2 text-[11px]">
                            <FileText className="w-3.5 h-3.5" />
                            <span className="font-semibold">{att.name}</span>
                            <span className="opacity-70">({att.size})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <button
              type="button"
              onClick={handleSimulateAttachment}
              className="p-2 text-slate-400 hover:text-slate-700 transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message or project note..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FF5520] focus:bg-white transition-all"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#FF5520] hover:bg-[#E04615] disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
