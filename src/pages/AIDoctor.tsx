
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Bot, Send, User, X, Brain, Zap, Pill, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  text: string;
  isBot: boolean;
};

const AIDoctor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI medical assistant. How can I help you today?",
      isBot: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  
  const symptomOptions = [
    { icon: <Activity className="h-4 w-4" />, label: 'Fatigue' },
    { icon: <Zap className="h-4 w-4" />, label: 'Headache' },
    { icon: <Pill className="h-4 w-4" />, label: 'Nausea' },
    { icon: <Activity className="h-4 w-4" />, label: 'Fever' },
  ];
  
  const sendMessage = () => {
    if (!inputText.trim() && !selectedSymptom) return;
    
    const newUserMessage = {
      id: messages.length + 1,
      text: selectedSymptom || inputText,
      isBot: false
    };
    
    setMessages([...messages, newUserMessage]);
    setInputText('');
    setSelectedSymptom(null);
    setIsAnalyzing(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Based on your symptoms, it could be a common cold. I recommend rest and plenty of fluids.",
        "Your symptoms might indicate a migraine. Have you experienced sensitivity to light?",
        "This could be related to stress or anxiety. Consider taking short breaks during the day.",
        "I'll need more information to provide an accurate assessment. Could you describe your symptoms in more detail?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage = {
        id: messages.length + 2,
        text: randomResponse,
        isBot: true
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold glow-text-cyan">AI Doctor</h1>
          <p className="text-white/70">Virtual medical consultation</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat area */}
          <div className="md:col-span-2">
            <div className="glass-panel h-[70vh] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-med-cyan/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-med-cyan" />
                </div>
                <div>
                  <div className="text-med-cyan font-semibold">MedAI Assistant</div>
                  <div className="text-xs text-white/50 flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-med-cyan"></div>
                    Online
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={cn(
                      "mb-4 max-w-[80%] animate-panel-fade-in",
                      message.isBot ? "ml-0" : "ml-auto"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {message.isBot && (
                        <div className="h-8 w-8 rounded-full bg-med-cyan/20 flex-shrink-0 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-med-cyan" />
                        </div>
                      )}
                      
                      <div 
                        className={cn(
                          "p-3 rounded-lg",
                          message.isBot 
                            ? "bg-black/30 text-white border border-white/10" 
                            : "bg-med-cyan/20 text-white"
                        )}
                      >
                        {message.text}
                      </div>
                      
                      {!message.isBot && (
                        <div className="h-8 w-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isAnalyzing && (
                  <div className="flex items-center gap-2 text-med-cyan text-sm">
                    <Brain className="h-4 w-4 animate-pulse" />
                    Analyzing your symptoms...
                  </div>
                )}
              </div>
              
              {/* Input */}
              <div className="p-4 border-t border-white/10">
                {selectedSymptom && (
                  <div className="flex items-center gap-2 bg-med-cyan/20 text-white px-3 py-1.5 rounded-full mb-2 w-fit">
                    {selectedSymptom}
                    <button 
                      onClick={() => setSelectedSymptom(null)}
                      className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Describe your symptoms..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') sendMessage();
                    }}
                    className="flex-1 bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-med-cyan"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-med-cyan hover:bg-med-cyan/80 text-black font-semibold rounded-lg px-4 py-2 transition-colors flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Common symptoms */}
            <div className="glass-panel p-4">
              <h3 className="text-med-cyan text-lg font-semibold mb-4">Common Symptoms</h3>
              <div className="grid grid-cols-2 gap-2">
                {symptomOptions.map((symptom, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSymptom(symptom.label)}
                    className={cn(
                      "p-2 rounded flex items-center gap-2 transition-colors",
                      selectedSymptom === symptom.label
                        ? "bg-med-cyan/20 text-med-cyan"
                        : "bg-black/20 text-white/70 hover:bg-black/30 hover:text-white"
                    )}
                  >
                    {symptom.icon}
                    <span>{symptom.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Health report */}
            <div className="glass-panel p-4">
              <h3 className="text-med-cyan text-lg font-semibold mb-4">Your Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-white/70">Risk Level</span>
                    <span className="text-sm text-med-cyan">Low</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="bg-med-cyan h-1.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-white/70 mb-2">Recent Conditions</div>
                  <div className="space-y-2">
                    <div className="bg-black/20 p-2 rounded-lg flex justify-between">
                      <span className="text-sm text-white/90">Seasonal Allergies</span>
                      <span className="text-xs text-med-cyan">2 weeks ago</span>
                    </div>
                    <div className="bg-black/20 p-2 rounded-lg flex justify-between">
                      <span className="text-sm text-white/90">Common Cold</span>
                      <span className="text-xs text-med-cyan">2 months ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI doctor info */}
            <div className="glass-panel p-4 bg-gradient-to-br from-black/40 to-med-cyan/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-med-cyan/20 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-med-cyan" />
                </div>
                <div>
                  <div className="text-white font-semibold">AI Doctor</div>
                  <div className="text-xs text-white/50">Medical Assistant</div>
                </div>
              </div>
              <p className="text-sm text-white/70">
                I can help analyze your symptoms, provide general health advice, and suggest 
                when you should consult with a healthcare professional.
              </p>
              <div className="mt-3 text-xs text-white/50 italic">
                Note: This AI assistant is not a substitute for professional medical advice.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIDoctor;
