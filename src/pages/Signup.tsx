
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2, Lock, Mail, User, Zap } from 'lucide-react';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure both passwords match",
      });
      return;
    }

    setIsLoading(true);
    
    // This is a mock signup - in a real app, you would connect to an authentication service
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully", {
        description: "Welcome to AstralMed System",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a1221] text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/691d9b71-ee33-47f1-8fa2-6b987b4366c6.png')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-purple-900/10"></div>
      
      {/* DNA-like animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className="absolute h-1 w-1 rounded-full bg-med-cyan"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              boxShadow: '0 0 15px rgba(51, 232, 245, 0.8)',
              animation: `float ${Math.random() * 5 + 10}s infinite ease-in-out alternate`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="h-8 w-8 rounded-full bg-med-cyan/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-med-cyan animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold text-white glow-text-cyan">AstralMed</h1>
          </div>
          <p className="text-white/50 mt-1">Create your medical profile</p>
        </div>
        
        <div className="glass-panel w-full max-w-md p-8 rounded-xl backdrop-blur-md">
          {/* Progress indicator */}
          <div className="flex items-center mb-6">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-med-cyan' : 'bg-white/20'}`}>
              <User className={`h-4 w-4 ${step >= 1 ? 'text-black' : 'text-white/70'}`} />
            </div>
            <div className={`h-0.5 flex-1 ${step >= 2 ? 'bg-med-cyan' : 'bg-white/20'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-med-cyan' : 'bg-white/20'}`}>
              <Lock className={`h-4 w-4 ${step >= 2 ? 'text-black' : 'text-white/70'}`} />
            </div>
          </div>
          
          {step === 1 && (
            <>
              <div className="flex items-center space-x-2 mb-6">
                <User className="h-6 w-6 text-med-cyan" />
                <h2 className="text-2xl font-bold">Personal Information</h2>
              </div>
              
              <form onSubmit={handleNext} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/70">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input 
                      id="fullName"
                      placeholder="John Doe" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-med-cyan"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-med-cyan"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Zap className="h-4 w-4 text-med-purple" />
                  <span>We'll send a verification code to this email address.</span>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-med-purple to-med-blue hover:opacity-90 transition-opacity"
                >
                  Continue
                </Button>
              </form>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="flex items-center space-x-2 mb-6">
                <Lock className="h-6 w-6 text-med-cyan" />
                <h2 className="text-2xl font-bold">Create Password</h2>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/70">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input 
                      id="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-med-cyan"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/70">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input 
                      id="confirmPassword"
                      type="password" 
                      placeholder="••••••••" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-med-cyan"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-white/50">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-med-cyan" />
                    <span>Password must be at least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-med-cyan" />
                    <span>Password must contain a number and symbol</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="flex-1 border-white/10 text-white hover:bg-white/5"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-med-cyan to-med-blue hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? 
                      <div className="flex items-center">
                        <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                        Processing...
                      </div>
                      : 
                      "Create Account"
                    }
                  </Button>
                </div>
              </form>
            </>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-white/50">
              Already have an account?{' '}
              <Link to="/login" className="text-med-cyan hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 px-6 text-center text-white/30 text-sm z-10 backdrop-blur-sm">
        © {new Date().getFullYear()} AstralMed Systems. Advanced healthcare technology.
      </footer>
    </div>
  );
};

export default Signup;
