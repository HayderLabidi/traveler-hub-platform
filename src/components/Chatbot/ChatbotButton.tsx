
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatbotDialog from "./ChatbotDialog";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <ChatbotDialog onClose={() => setIsOpen(false)} />
      ) : (
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-brand-500 hover:bg-brand-600 p-0 flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
      )}
    </div>
  );
};

export default ChatbotButton;
