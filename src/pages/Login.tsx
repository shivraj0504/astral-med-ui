
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, Lock, Mail, MoveRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This is a mock login - in a real app, you would connect to an authentication service
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful", {
        description: "Welcome to AstralMed System",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a1221] text-white overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/lovable-uploads/76f65291-b048-4259-9afe-90b3a65a0b5d.png')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-purple-900/20"></div>
      
      {/* Animated background circles */}
      <div className="absolute left-0 top-20 w-64 h-64 bg-med-cyan/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute right-0 bottom-20 w-80 h-80 bg-med-purple/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
      
      <div className="flex-1 flex">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center z-10 p-6">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="h-10 w-10 rounded-full bg-med-cyan/20 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-med-cyan animate-pulse"></div>
                </div>
                <h1 className="text-3xl font-bold text-white glow-text-cyan">AstralMed</h1>
              </div>
              <p className="text-white/50 mt-2">Advanced Medical System</p>
            </div>
            
            <div className="glass-panel p-8 rounded-xl backdrop-blur-md">
              <div className="flex items-center space-x-2 mb-6">
                <LogIn className="h-6 w-6 text-med-cyan" />
                <h2 className="text-2xl font-bold">Login</h2>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
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
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-white/70">Password</Label>
                    <a href="#" className="text-sm text-med-cyan hover:underline">Forgot password?</a>
                  </div>
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
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-med-cyan to-med-blue hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? 
                    <div className="flex items-center">
                      <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></div>
                      Logging in...
                    </div>
                    : 
                    "Login"
                  }
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-white/50">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-med-cyan hover:underline">Sign up</Link>
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-med-cyan gap-1 text-sm">
                  <span>Return to home</span>
                  <MoveRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Imagery */}
        <div className="hidden lg:flex w-1/2 relative items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1221] to-transparent z-10"></div>
          
          {/* 3D Medical visualization */}
          <div className="relative z-0">
            <img 
              src="/lovable-uploads/1aa59af9-dcfa-417a-9eae-a9edb6de98a7.png" 
              alt="Medical 3D Model" 
              className="max-h-[80vh] object-contain opacity-70 animate-float"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(51, 232, 245, 0.3))',
              }}
            />
            
            {/* Interactive data points */}
            <div className="absolute top-1/4 right-1/4 w-16 h-16">
              <div className="absolute inset-0 rounded-full bg-med-cyan/10 animate-ping-slow"></div>
              <div className="absolute inset-[25%] rounded-full bg-med-cyan/30"></div>
              <div className="absolute inset-[45%] rounded-full bg-med-cyan"></div>
            </div>
            
            <div className="absolute bottom-1/4 left-1/3 w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-med-purple/10 animate-ping-slow delay-300"></div>
              <div className="absolute inset-[25%] rounded-full bg-med-purple/30"></div>
              <div className="absolute inset-[45%] rounded-full bg-med-purple"></div>
            </div>
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

export default Login;
