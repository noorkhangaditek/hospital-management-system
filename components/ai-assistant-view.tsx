"use client"

import { useChat } from 'ai/react';
import { Send, Bot, User } from 'lucide-react';

export default function AIAssistantView() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-[75vh] bg-card rounded-xl border border-border shadow-md overflow-hidden">
      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-10">
            Assalam-o-Alaikum! Main Noor Khan ka AI Assistant hoon. Main aapki kaise madad kar sakta hoon?
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 p-3 rounded-2xl max-w-[85%] ${
              m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'
            }`}>
              {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              <p className="text-sm">{m.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-background flex gap-2">
        <input
          className="flex-1 p-2 bg-muted rounded-lg outline-none text-sm border focus:border-primary"
          value={input}
          placeholder="Yahan kuch likhen..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}