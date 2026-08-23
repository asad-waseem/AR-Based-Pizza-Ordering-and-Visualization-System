"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { pizzas } from "@/data/pizzas";

// States: idle | connecting | listening | processing | speaking | error | ended
const STATES = {
  IDLE: "idle",
  CONNECTING: "connecting",
  LISTENING: "listening",
  PROCESSING: "processing",
  SPEAKING: "speaking",
  ERROR: "error",
  ENDED: "ended",
};

export default function VoiceCall() {
  const [callState, setCallState] = useState(STATES.IDLE);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const messagesRef = useRef([]);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);
  const isListeningRef = useRef(false);
  const callActiveRef = useRef(false);
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  // ─── Speech Recognition Setup ───
  const createRecognition = useCallback(() => {
    const SpeechRecognition = typeof window !== "undefined" 
      ? window.SpeechRecognition || window.webkitSpeechRecognition 
      : null;

    if (!SpeechRecognition) {
      console.error("[VoiceCall] SpeechRecognition not supported");
      return null;
    }

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (event) => {
      const speechText = event.results[0]?.[0]?.transcript || "";
      console.log("[VoiceCall] Heard:", speechText);
      if (speechText.trim()) {
        handleUserSpeech(speechText.trim());
      }
    };

    rec.onerror = (event) => {
      console.warn("[VoiceCall] Recognition error:", event.error);
      if (event.error === "no-speech" && callActiveRef.current) {
        // Silence - restart listening
        startListening();
      } else if (event.error === "not-allowed") {
        setErrorMessage("Microphone access denied. Please allow microphone permissions.");
        setCallState(STATES.ERROR);
      } else if (callActiveRef.current) {
        startListening();
      }
    };

    rec.onend = () => {
      isListeningRef.current = false;
      // If still in call and was listening, the result handler will process
    };

    return rec;
  }, []);

  // ─── Start Listening ───
  const startListening = useCallback(() => {
    if (!callActiveRef.current || isMuted) return;

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch(e) {}
      }
      const rec = createRecognition();
      if (!rec) {
        setErrorMessage("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
        setCallState(STATES.ERROR);
        return;
      }
      recognitionRef.current = rec;
      rec.start();
      isListeningRef.current = true;
      setCallState(STATES.LISTENING);
      console.log("[VoiceCall] Listening...");
    } catch (err) {
      console.error("[VoiceCall] Failed to start recognition:", err);
      if (callActiveRef.current) {
        setTimeout(() => startListening(), 500);
      }
    }
  }, [createRecognition, isMuted]);

  // ─── Stop Listening ───
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch(e) {}
      recognitionRef.current = null;
    }
    isListeningRef.current = false;
  }, []);

  // ─── Handle User Speech ───
  const handleUserSpeech = useCallback(async (text) => {
    if (!callActiveRef.current) return;

    stopListening();
    setCallState(STATES.PROCESSING);

    // Add user message to transcript
    setTranscript(prev => [...prev, { role: "user", text }]);
    messagesRef.current = [...messagesRef.current, { role: "user", content: text }];

    console.log("[VoiceCall] Processing user speech:", text);

    try {
      // Call Groq via our voice-chat API
      const res = await fetch("/api/voice-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messagesRef.current }),
      });

      if (!res.ok) throw new Error(`API returned ${res.status}`);

      const data = await res.json();
      const aiText = data.text || "I didn't catch that, could you repeat?";

      console.log("[VoiceCall] AI response:", aiText);

      // Add AI message
      setTranscript(prev => [...prev, { role: "assistant", text: aiText }]);
      messagesRef.current = [...messagesRef.current, { role: "assistant", content: aiText }];

      // Handle order extraction
      if (data.order && !orderSubmitted) {
        console.log("[VoiceCall] Order extracted:", data.order);
        setCurrentOrder(data.order);
        await submitOrder(data.order);
      }

      // Speak the response
      await speakText(aiText);

    } catch (error) {
      console.error("[VoiceCall] Processing error:", error);
      setTranscript(prev => [...prev, { role: "assistant", text: "I'm sorry, I had a connection issue. Could you say that again?" }]);
      
      if (callActiveRef.current) {
        startListening();
      }
    }
  }, [orderSubmitted]);

  // ─── Speak Text via Edge TTS ───
  const speakText = useCallback(async (text) => {
    if (!callActiveRef.current) return;

    setCallState(STATES.SPEAKING);

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        console.error("[VoiceCall] TTS failed:", res.status);
        // Fallback: use browser speech synthesis
        fallbackSpeak(text);
        return;
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      await new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
          resolve();
        };
        
        audio.onerror = (e) => {
          URL.revokeObjectURL(audioUrl);
          audioRef.current = null;
          console.error("[VoiceCall] Audio playback error:", e);
          reject(e);
        };

        audio.play().catch(reject);
      });

    } catch (error) {
      console.error("[VoiceCall] TTS/playback error:", error);
      fallbackSpeak(text);
      return;
    }

    // After speaking, go back to listening
    if (callActiveRef.current) {
      startListening();
    }
  }, [startListening]);

  // ─── Fallback: Browser Speech Synthesis ───
  const fallbackSpeak = useCallback((text) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      if (callActiveRef.current) startListening();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => {
      if (callActiveRef.current) startListening();
    };
    utterance.onerror = () => {
      if (callActiveRef.current) startListening();
    };
    window.speechSynthesis.speak(utterance);
  }, [startListening]);

  // ─── Submit Order ───
  const submitOrder = useCallback(async (orderData) => {
    if (orderSubmitted) return;

    console.log("[VoiceCall] Submitting order to admin...");

    try {
      // Map order items to match the existing order schema
      const mappedItems = (orderData.items || []).map(item => {
        const pizzaItem = pizzas.find(p => 
          p.name.toLowerCase().includes((item.name || "").toLowerCase())
        );
        const sizeKey = (item.size || "medium").toLowerCase();
        const price = pizzaItem?.sizes?.[sizeKey]?.price || item.price || 0;

        return {
          name: pizzaItem?.name || item.name,
          selectedSize: item.size || "Medium",
          quantity: parseInt(item.quantity) || 1,
          price: price,
        };
      });

      const total = mappedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const nameParts = (orderData.customer_name || "Customer").split(" ");

      const payload = {
        customer: {
          firstName: nameParts[0] || "Voice",
          lastName: nameParts.slice(1).join(" ") || "Customer",
          email: orderData.phone || "Voice Call",
          address: orderData.address || "Not provided",
        },
        items: mappedItems,
        total: total,
        source: "ai_voice_call",
        orderNotes: "Order placed via AI Voice Call",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOrderSubmitted(true);
        console.log("[VoiceCall] Order submitted successfully");
      } else {
        console.error("[VoiceCall] Order submission failed:", res.status);
      }
    } catch (error) {
      console.error("[VoiceCall] Order submission error:", error);
    }
  }, [orderSubmitted]);

  // ─── Start Call ───
  const startCall = useCallback(async () => {
    setIsCallOpen(true);
    setCallState(STATES.CONNECTING);
    setTranscript([]);
    setCurrentOrder(null);
    setErrorMessage("");
    setOrderSubmitted(false);
    messagesRef.current = [];
    callActiveRef.current = true;

    // Greet the customer
    const greeting = "Hello! Welcome to FoodKing. I'm Slice, your AI ordering assistant. What pizza can I get for you today?";
    setTranscript([{ role: "assistant", text: greeting }]);
    messagesRef.current = [{ role: "assistant", content: greeting }];

    await speakText(greeting);
  }, [speakText]);

  // ─── End Call ───
  const endCall = useCallback(() => {
    callActiveRef.current = false;
    stopListening();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setCallState(STATES.ENDED);
    
    setTimeout(() => {
      setIsCallOpen(false);
      setCallState(STATES.IDLE);
    }, 2000);
  }, [stopListening]);

  // ─── Toggle Mute ───
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (newMuted) {
        stopListening();
      } else if (callState === STATES.LISTENING) {
        startListening();
      }
      return newMuted;
    });
  }, [callState, stopListening, startListening]);

  // ─── State Label ───
  const getStateLabel = () => {
    switch (callState) {
      case STATES.CONNECTING: return "Connecting...";
      case STATES.LISTENING: return isMuted ? "Microphone Muted" : "Listening...";
      case STATES.PROCESSING: return "Processing...";
      case STATES.SPEAKING: return "Speaking...";
      case STATES.ERROR: return "Error";
      case STATES.ENDED: return "Call Ended";
      default: return "";
    }
  };

  // ─── Render ───
  return (
    <>
      {/* LEFT SIDE CALL BUTTON */}
      {!isCallOpen && (
        <button
          className="voice-call-fab"
          onClick={startCall}
          title="Call AI Assistant"
          aria-label="Start AI Voice Call"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </button>
      )}

      {/* CALL INTERFACE */}
      {isCallOpen && (
        <div className="voice-call-overlay">
          <div className="voice-call-modal">
            {/* Header */}
            <div className="vc-header">
              <div className="vc-avatar">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <div className="vc-info">
                <h4>Slice - AI Assistant</h4>
                <span className={`vc-status vc-status-${callState}`}>{getStateLabel()}</span>
              </div>
            </div>

            {/* State Visualizer */}
            <div className="vc-visualizer">
              {callState === STATES.LISTENING && !isMuted && (
                <div className="vc-pulse-ring">
                  <div className="vc-pulse-dot" />
                </div>
              )}
              {callState === STATES.SPEAKING && (
                <div className="vc-speaking-bars">
                  <span /><span /><span /><span /><span />
                </div>
              )}
              {callState === STATES.PROCESSING && (
                <div className="vc-thinking">
                  <span /><span /><span />
                </div>
              )}
              {callState === STATES.CONNECTING && (
                <div className="vc-connecting-spinner" />
              )}
              {callState === STATES.ERROR && (
                <div className="vc-error-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <p style={{color:'#ef4444', fontSize:'13px', marginTop:'8px'}}>{errorMessage}</p>
                </div>
              )}
              {callState === STATES.ENDED && (
                <div style={{textAlign:'center'}}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <p style={{color:'#22c55e', fontSize:'13px', marginTop:'8px'}}>
                    {orderSubmitted ? "Order placed successfully!" : "Call ended"}
                  </p>
                </div>
              )}
            </div>

            {/* Transcript */}
            <div className="vc-transcript">
              {transcript.map((msg, i) => (
                <div key={i} className={`vc-msg vc-msg-${msg.role}`}>
                  <span className="vc-msg-label">{msg.role === "user" ? "You" : "Slice"}</span>
                  <p>{msg.text}</p>
                </div>
              ))}
              <div ref={transcriptEndRef} />
            </div>

            {/* Controls */}
            <div className="vc-controls">
              <button
                className={`vc-btn vc-btn-mute ${isMuted ? "active" : ""}`}
                onClick={toggleMute}
                disabled={callState === STATES.ENDED || callState === STATES.CONNECTING}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23"/>
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.12 1.49-.34 2.18"/>
                    <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                )}
              </button>

              <button className="vc-btn vc-btn-end" onClick={endCall} title="End Call">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91"/>
                  <line x1="23" y1="1" x2="1" y2="23"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* ─── CALL FAB (LEFT SIDE) ─── */
        .voice-call-fab {
          position: fixed;
          left: 24px;
          bottom: 30px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9998;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.5);
          transition: all 0.3s ease;
          animation: vcFabPulse 2.5s infinite ease-in-out;
        }
        .voice-call-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(34, 197, 94, 0.6);
        }
        @keyframes vcFabPulse {
          0% { box-shadow: 0 4px 15px rgba(34,197,94,0.5), 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 4px 15px rgba(34,197,94,0.5), 0 0 0 12px rgba(34,197,94,0); }
          100% { box-shadow: 0 4px 15px rgba(34,197,94,0.5), 0 0 0 0 rgba(34,197,94,0.4); }
        }

        /* ─── CALL OVERLAY ─── */
        .voice-call-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: vcFadeIn 0.3s ease;
        }
        @keyframes vcFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }

        /* ─── CALL MODAL ─── */
        .voice-call-modal {
          width: 420px;
          max-width: 95vw;
          max-height: 90vh;
          background: #1a1a2e;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          animation: vcSlideUp 0.35s ease;
        }
        @keyframes vcSlideUp {
          from { transform: translateY(30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        /* ─── HEADER ─── */
        .vc-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px;
          background: linear-gradient(135deg, #e5002a, #b80024);
        }
        .vc-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vc-info h4 {
          color: #fff;
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }
        .vc-status {
          font-size: 12px;
          color: rgba(255,255,255,0.85);
        }
        .vc-status-listening { animation: vcBlink 1.5s infinite; }
        @keyframes vcBlink {
          0%,100% { opacity: 1; } 50% { opacity: 0.5; }
        }

        /* ─── VISUALIZER ─── */
        .vc-visualizer {
          min-height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #16213e;
        }

        /* Pulse ring (listening) */
        .vc-pulse-ring {
          position: relative;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vc-pulse-ring::before, .vc-pulse-ring::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #22c55e;
          animation: vcPulseRing 1.5s infinite ease-out;
        }
        .vc-pulse-ring::after { animation-delay: 0.5s; }
        @keyframes vcPulseRing {
          from { transform: scale(0.5); opacity: 1; }
          to { transform: scale(1.5); opacity: 0; }
        }
        .vc-pulse-dot {
          width: 16px;
          height: 16px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(34,197,94,0.6);
        }

        /* Speaking bars */
        .vc-speaking-bars {
          display: flex;
          gap: 4px;
          align-items: flex-end;
          height: 40px;
        }
        .vc-speaking-bars span {
          width: 5px;
          background: #e5002a;
          border-radius: 3px;
          animation: vcBar 0.8s infinite ease-in-out alternate;
        }
        .vc-speaking-bars span:nth-child(1) { height: 12px; animation-delay: 0s; }
        .vc-speaking-bars span:nth-child(2) { height: 24px; animation-delay: 0.15s; }
        .vc-speaking-bars span:nth-child(3) { height: 36px; animation-delay: 0.3s; }
        .vc-speaking-bars span:nth-child(4) { height: 24px; animation-delay: 0.45s; }
        .vc-speaking-bars span:nth-child(5) { height: 12px; animation-delay: 0.6s; }
        @keyframes vcBar {
          from { height: 8px; } to { height: 36px; }
        }

        /* Thinking dots */
        .vc-thinking {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .vc-thinking span {
          width: 8px;
          height: 8px;
          background: #fbbf24;
          border-radius: 50%;
          animation: vcThink 1s infinite alternate;
        }
        .vc-thinking span:nth-child(2) { animation-delay: 0.2s; }
        .vc-thinking span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes vcThink {
          from { transform: scale(0.7); opacity: 0.4; }
          to { transform: scale(1.2); opacity: 1; }
        }

        /* Connecting spinner */
        .vc-connecting-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(255,255,255,0.2);
          border-top: 3px solid #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ─── TRANSCRIPT ─── */
        .vc-transcript {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 180px;
          max-height: 300px;
          background: #0f1729;
        }
        .vc-msg {
          max-width: 90%;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.45;
        }
        .vc-msg-label {
          display: block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 3px;
          letter-spacing: 0.5px;
        }
        .vc-msg p {
          margin: 0;
          color: inherit;
        }
        .vc-msg-user {
          align-self: flex-end;
          background: #1e3a5f;
          color: #e0f2fe !important;
        }
        .vc-msg-user .vc-msg-label { color: #7dd3fc; }
        .vc-msg-user p { color: #e0f2fe !important; }
        .vc-msg-assistant {
          align-self: flex-start;
          background: #1e293b;
          color: #f1f5f9 !important;
        }
        .vc-msg-assistant .vc-msg-label { color: #fb923c; }
        .vc-msg-assistant p { color: #f1f5f9 !important; }

        /* ─── CONTROLS ─── */
        .vc-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: #16213e;
        }
        .vc-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .vc-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .vc-btn-mute {
          background: #374151;
          color: #d1d5db;
        }
        .vc-btn-mute:hover:not(:disabled) {
          background: #4b5563;
        }
        .vc-btn-mute.active {
          background: #ef4444;
          color: #fff;
        }
        .vc-btn-end {
          background: #dc2626;
          width: 60px;
          height: 60px;
        }
        .vc-btn-end:hover {
          background: #b91c1c;
          transform: scale(1.05);
        }

        /* ─── MOBILE ─── */
        @media (max-width: 768px) {
          .voice-call-fab {
            left: 16px;
            bottom: 90px;
            width: 50px;
            height: 50px;
          }
          .voice-call-modal {
            width: 100%;
            max-width: 100vw;
            max-height: 100vh;
            border-radius: 0;
          }
        }
      `}</style>
    </>
  );
}
