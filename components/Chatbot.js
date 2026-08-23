"use client";
import React, { useState, useEffect, useRef } from 'react';
import { pizzas } from '@/data/pizzas';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Slice, your AI Pizza Assistant 🍕. What pizza would you like to order today?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.order) {
        const orderInfo = data.order;
        const pizzaName = orderInfo.pizza_name || "";
        const pizzaItem = pizzas.find(p => p.name.toLowerCase().includes(pizzaName.toLowerCase())) || pizzas[0];
        const sizeArg = orderInfo.size || "Medium";
        const price = pizzaItem.sizes[sizeArg.toLowerCase()]?.price || pizzaItem.sizes.medium.price;
        const qty = parseInt(orderInfo.quantity) || 1;
        const total = price * qty;

        const payload = {
          customer: {
            firstName: (orderInfo.customer_name || 'Customer').split(' ')[0],
            lastName: (orderInfo.customer_name || '').split(' ').slice(1).join(' ') || '',
            email: orderInfo.phone || 'Phone not provided',
            address: orderInfo.address || 'Address not provided'
          },
          items: [{
            name: pizzaItem.name,
            selectedSize: sizeArg,
            quantity: qty,
            price: price
          }],
          total: total
        };

        // Submit order to in-memory orders store
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const botReply = data.text ? `${data.text}\n\n✅ Order confirmed ($${total.toFixed(2)})! Sent to Kitchen & Admin Panel.` : `✅ Order confirmed for ${qty}x ${sizeArg} ${pizzaItem.name} ($${total.toFixed(2)})! Sent to Kitchen & Admin Panel.`;

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: botReply
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.text || "I'm listening, tell me your pizza preference!"
        }]);
      }

    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops, connection hiccup. Please try again!" }]);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div 
        className={`chatbot-fab ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AI Pizza Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
           <circle cx="9" cy="10" r="1" fill="#fff"></circle>
           <circle cx="15" cy="10" r="1" fill="#fff"></circle>
        </svg>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window shadow-style">
          <div className="chatbot-header bg-red text-white">
            <div className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2">
                 <circle cx="12" cy="12" r="10"></circle>
                 <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                 <line x1="9" y1="9" x2="9.01" y2="9"></line>
                 <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
              <div>
                <h5 className="mb-0 text-white" style={{fontSize: '15px', fontWeight: 'bold'}}>Slice (AI Assistant)</h5>
                <small style={{fontSize: '11px', opacity: 0.9}}>Powered by Groq AI</small>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn" aria-label="Close Chat">&times;</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`message-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}
                style={{
                  color: msg.role === 'user' ? '#ffffff' : '#111827',
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div className="message-bubble bot typing-indicator">
                 <span></span><span></span><span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask anything or place your order..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" disabled={isTyping || !input.trim()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="22" y1="2" x2="11" y2="13"></line>
                 <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}

      <style jsx global>{`
        .chatbot-fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 58px;
          height: 58px;
          background-color: #e5002a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(229, 0, 42, 0.45);
          cursor: pointer;
          z-index: 9999;
          transition: all 0.3s ease;
          animation: floatFab 3s infinite ease-in-out;
        }
        .chatbot-fab:hover {
          transform: scale(1.08);
        }
        .chatbot-fab.active {
          animation: none;
          transform: scale(0.9);
          opacity: 0;
          pointer-events: none;
        }

        @keyframes floatFab {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        .chatbot-window {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 380px;
          height: 540px;
          background: #ffffff;
          border-radius: 16px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.18);
          animation: slideUp 0.25s ease-out forwards;
          border: 1px solid #e5e7eb;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .chatbot-header {
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 26px;
          line-height: 1;
          cursor: pointer;
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .close-btn:hover {
          opacity: 1;
        }

        .chatbot-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f9fafb;
        }

        .message-bubble {
          max-width: 85%;
          padding: 11px 15px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.45;
          word-break: break-word;
        }

        .message-bubble.bot {
          background: #ffffff !important;
          color: #111827 !important;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .message-bubble.user {
          background: #e5002a !important;
          color: #ffffff !important;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }

        .typing-indicator {
          display: flex;
          gap: 5px;
          padding: 12px 16px;
          align-items: center;
          width: fit-content;
        }
        .typing-indicator span {
          width: 6px;
          height: 6px;
          background: #6b7280 !important;
          border-radius: 50%;
          animation: typing 1s infinite alternate;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          from { transform: translateY(0); opacity: 0.3; }
          to { transform: translateY(-4px); opacity: 1; }
        }

        .chatbot-input {
          display: flex;
          border-top: 1px solid #f3f4f6;
          padding: 12px 14px;
          background: #ffffff;
          align-items: center;
          gap: 8px;
        }

        .chatbot-input input {
          flex: 1;
          border: 1px solid #d1d5db !important;
          border-radius: 20px;
          padding: 10px 14px;
          outline: none;
          font-size: 13.5px;
          color: #111827 !important;
          background-color: #ffffff !important;
          transition: border-color 0.2s;
        }
        .chatbot-input input:focus {
          border-color: #e5002a !important;
        }

        .chatbot-input button {
          background: #e5002a;
          border: none;
          color: #ffffff;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .chatbot-input button:hover {
          background: #c40024;
        }
        .chatbot-input button:disabled {
          background: #e5e7eb;
          color: #9ca3af;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .chatbot-window {
            width: calc(100% - 32px);
            right: 16px;
            bottom: 16px;
            height: 75vh;
          }
          .chatbot-fab {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </>
  );
}
