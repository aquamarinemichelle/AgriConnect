import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff, Sprout, TrendingUp, Shield, CloudRain } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserCredentials } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(credentials);
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Sprout className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Agri-Connect
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Agricultural Intelligence Platform
            </p>
          </div>

          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center font-semibold">Welcome back</CardTitle>
              <CardDescription className="text-center text-base">
                Sign in to access your farm analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="rounded-lg bg-destructive/15 p-4 border border-destructive/20">
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={credentials.email}
                      onChange={handleChange}
                      className="pl-10 h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      required
                      value={credentials.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm pt-4 border-t border-border">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link
                  to="/register"
                  className="text-primary hover:underline font-semibold"
                >
                  Create account
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Hero Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-green-50 dark:from-primary/5 dark:to-green-900/10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-12 relative z-10">
          <div className="max-w-lg space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2 text-sm bg-background/50 backdrop-blur-sm shadow-sm">
                <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
                Augumented Data Retrieval-Powered Agriculture Platform
              </div>
              <h2 className="text-5xl font-bold tracking-tight text-foreground leading-tight">
                Transform Your 
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"> Farming</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Leverage cutting-edge AI technology to monitor crops, optimize resources, 
                and make data-driven decisions for sustainable farming.
              </p>
            </div>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Smart Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time insights and predictive analytics
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CloudRain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Weather Intelligence</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced weather monitoring and alerts
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Crop Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    Disease detection and prevention
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sprout className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Growth Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor plant health and development
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">15K+</div>
                <div className="text-sm text-muted-foreground">Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;