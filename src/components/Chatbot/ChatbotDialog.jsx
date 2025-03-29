import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const ChatbotDialog = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      text: "Hello! Welcome to RideShare. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help with that!",
        "Thanks for your question. Let me find that information for you.",
        "That's a great question about our ridesharing service.",
        "I can definitely help you schedule a ride.",
        "Our drivers are available 24/7 in most major cities.",
        "You can sign up as either a driver or a passenger through our app.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: Date.now().toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="w-80 sm:w-96 h-96 flex flex-col shadow-xl animate-fade-in">
      <div className="p-3 bg-brand-500 text-white flex justify-between items-center rounded-t-md">
        <h3 className="font-semibold">RideShare Support</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-8 w-8 text-white hover:bg-brand-600"
        >
          <X size={18} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg ${
                message.isUser
                  ? "bg-brand-500 text-white rounded-tr-none"
                  : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 mr-2"
        />
        <Button 
          onClick={handleSend} 
          size="icon"
          disabled={!input.trim()}
          className="bg-brand-500 hover:bg-brand-600"
        >
          <Send size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default ChatbotDialog;
