
import { useState, useRef, useEffect } from "react";
import { Send, PhoneCall, Image, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PassengerDriverChat = ({ driverId, passengerId, rideId, driverName, driverPhoto, closeChat }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  const { toast } = useToast();

  // Mock initial messages (in a real app, these would be fetched from API)
  useEffect(() => {
    // Simulate loading chat history
    const initialMessages = [
      {
        id: 1,
        senderId: driverId,
        text: "Hello! I'll be your driver for this ride.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isDriver: true
      },
      {
        id: 2,
        senderId: passengerId,
        text: "Great! Looking forward to the ride.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        isDriver: false
      }
    ];
    
    setChatHistory(initialMessages);
  }, [driverId, passengerId]);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add the new message to chat history
    const newMessage = {
      id: Date.now(),
      senderId: passengerId,
      text: message,
      timestamp: new Date().toISOString(),
      isDriver: false
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage("");
    
    // Simulate driver response after a delay
    setTimeout(() => {
      const driverResponse = {
        id: Date.now() + 1,
        senderId: driverId,
        text: getRandomResponse(),
        timestamp: new Date().toISOString(),
        isDriver: true
      };
      
      setChatHistory(prevChat => [...prevChat, driverResponse]);
    }, 2000);
  };

  const getRandomResponse = () => {
    const responses = [
      "I'll be there soon!",
      "Thanks for the update.",
      "I'm about 5 minutes away.",
      "Traffic is good, we're on schedule.",
      "Do you have any luggage with you?",
      "I'll park near the main entrance.",
      "Feel free to call if you can't find me."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="p-3 flex flex-row justify-between items-center border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src={driverPhoto} alt={driverName} />
            <AvatarFallback>{driverName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{driverName}</h3>
            <p className="text-xs text-muted-foreground">Driver</p>
          </div>
        </div>
        <div className="flex">
          <Button variant="ghost" size="icon" onClick={() => {
            toast({
              title: "Call feature",
              description: "Call functionality will be implemented soon."
            });
          }}>
            <PhoneCall className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={closeChat}>
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.isDriver ? "justify-start" : "justify-end"}`}
          >
            <div className={`max-w-[80%] ${msg.isDriver ? "order-2" : "order-1"}`}>
              {msg.isDriver && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={driverPhoto} alt={driverName} />
                  <AvatarFallback>{driverName?.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <div
              className={`px-3 py-2 rounded-lg max-w-[80%] ${
                msg.isDriver
                  ? "bg-muted text-foreground rounded-tl-none ml-2"
                  : "bg-primary text-primary-foreground rounded-tr-none"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              <p className="text-xs opacity-70 mt-1 text-right">
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </CardContent>
      <div className="border-t p-3 flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Image className="h-5 w-5" />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button 
          onClick={handleSendMessage} 
          size="icon"
          disabled={!message.trim()}
          className="bg-primary hover:bg-primary/90"
        >
          <Send className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Mic className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};

export default PassengerDriverChat;
