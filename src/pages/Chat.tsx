import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Clock } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your FarmAI assistant. How can I help you today?", sender: 'bot', time: '10:00 AM' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setIsLoading(true);
      
      try {
        const response = await fetch('http://localhost:5000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: input,
            history: messages.map(msg => ({
              sender: msg.sender,
              text: msg.text
            }))
          })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
          const botResponse: Message = {
            id: messages.length + 2,
            text: data.response,
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botResponse]);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: Message = {
          id: messages.length + 2,
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuickAction = (action: string) => {
    const quickQuestions = {
      'Crop Issues': "I'm having issues with my crops. Can you help me identify what's wrong and suggest solutions?",
      'Schedule': "What's the optimal schedule for planting and harvesting seasonal crops in my region?",
      'Expert Help': "I need expert advice on improving my farm's productivity and sustainability."
    };
    
    setInput(quickQuestions[action as keyof typeof quickQuestions] || action);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">FarmAI Assistant</h1>
            <p className="text-muted-foreground">Get instant help with crop issues, livestock health, and farm management</p>
          </div>

          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-green-600" />
                FarmAI Assistant
              </CardTitle>
              <CardDescription>
                {isLoading ? "Typing..." : "Online - Ready to help"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender === 'bot' ? (
                          <Bot className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                        <span className="text-xs opacity-70">{message.time}</span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-md rounded-lg p-3 bg-muted">
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4" />
                        <span className="text-xs opacity-70">Typing...</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={isLoading}
                  />
                  <Button onClick={handleSend} size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleQuickAction('Crop Issues')}
            >
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Bot className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-medium">Crop Issues</h3>
                <p className="text-sm text-muted-foreground">Get help with plant diseases</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleQuickAction('Schedule')}
            >
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-medium">Schedule</h3>
                <p className="text-sm text-muted-foreground">Plan farming activities</p>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleQuickAction('Expert Help')}
            >
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-medium">Expert Help</h3>
                <p className="text-sm text-muted-foreground">Connect with specialists</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;