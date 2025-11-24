import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Phone, MapPin, AlertCircle, Eye, EyeOff, Sprout, TrendingUp, Shield, CloudRain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { RegisterData, ProductionType } from '../types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    farmSize: 0,
    password: '',
    confirmPassword: '',
    productionType: 'crops' as ProductionType,
    crops: '',
    livestock: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'farmSize' ? Number(value) : value
    }));
  };

  const handleProductionTypeChange = (type: ProductionType) => {
    setFormData(prev => ({
      ...prev,
      productionType: type,
      crops: type === 'livestock' ? '' : prev.crops,
      livestock: type === 'crops' ? '' : prev.livestock
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password should be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const productionTypes = [
    {
      value: 'crops' as ProductionType,
      label: 'Crops Only',
      icon: Sprout,
      description: 'I grow crops like grains, vegetables, fruits, etc.',
      color: 'text-green-600'
    },
    {
      value: 'livestock' as ProductionType,
      label: 'Livestock Only',
      icon: TrendingUp,
      description: 'I raise animals like cattle, poultry, sheep, etc.',
      color: 'text-orange-600'
    },
    {
      value: 'both' as ProductionType,
      label: 'Both Crops & Livestock',
      icon: Shield,
      description: 'I practice mixed farming with both crops and animals',
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Registration Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Sprout className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              FarmAI
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Join Our Agricultural Intelligence Platform
            </p>
          </div>

          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center font-semibold">Create Your Account</CardTitle>
              <CardDescription className="text-center text-base">
                Join thousands of farmers using FarmAI
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="pl-10 h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="farmSize" className="text-sm font-medium">Farm Size (acres) *</Label>
                      <Input
                        id="farmSize"
                        name="farmSize"
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="Enter farm size in acres"
                        required
                        value={formData.farmSize}
                        onChange={handleChange}
                        className="h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="address" className="text-sm font-medium">Farm Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Enter your farm address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="pl-10 h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Production Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">What do you produce? *</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {productionTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.productionType === type.value;
                      
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleProductionTypeChange(type.value)}
                          className={`relative flex flex-col p-5 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
                            isSelected
                              ? 'border-primary bg-primary/5 shadow-md'
                              : 'border-border bg-card hover:border-primary/50 hover:bg-accent/50'
                          }`}
                        >
                          <div className="flex items-center mb-3">
                            <div className={`p-2 rounded-lg mr-3 transition-colors ${
                              isSelected ? 'bg-primary/20' : 'bg-muted'
                            }`}>
                              <Icon className={`h-5 w-5 ${
                                isSelected ? 'text-primary' : type.color
                              }`} />
                            </div>
                            <span className={`font-semibold ${
                              isSelected ? 'text-primary' : 'text-foreground'
                            }`}>
                              {type.label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground text-left leading-relaxed">
                            {type.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Production Details */}
                {(formData.productionType !== 'livestock' || formData.productionType !== 'crops') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.productionType !== 'livestock' && (
                      <div className="space-y-3">
                        <Label htmlFor="crops" className="text-sm font-medium">
                          Crops Grown {formData.productionType === 'crops' && '*'}
                        </Label>
                        <Input
                          id="crops"
                          name="crops"
                          type="text"
                          placeholder="e.g., Corn, Wheat, Vegetables, Fruits"
                          required={formData.productionType === 'crops'}
                          value={formData.crops}
                          onChange={handleChange}
                          className="h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                        />
                      </div>
                    )}

                    {formData.productionType !== 'crops' && (
                      <div className="space-y-3">
                        <Label htmlFor="livestock" className="text-sm font-medium">
                          Livestock Raised {formData.productionType === 'livestock' && '*'}
                        </Label>
                        <Input
                          id="livestock"
                          name="livestock"
                          type="text"
                          placeholder="e.g., Cattle, Poultry, Sheep, Goats"
                          required={formData.productionType === 'livestock'}
                          value={formData.livestock}
                          onChange={handleChange}
                          className="h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b pb-2">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password (min. 6 characters)"
                          required
                          value={formData.password}
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

                    <div className="space-y-3">
                      <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 pr-10 h-12 border-muted-foreground/25 focus:border-primary transition-colors"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Farmer Account
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center text-sm pt-4 border-t border-border">
                <span className="text-muted-foreground">Already have an account? </span>
                <Link
                  to="/login"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign in
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
                Start Your Smart Farming Journey
              </div>
              <h2 className="text-5xl font-bold tracking-tight text-foreground leading-tight">
                Grow Your 
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent"> Farm Smarter</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join our platform to access AI-powered tools, real-time analytics, 
                and expert insights that help you optimize every aspect of your farming operations.
              </p>
            </div>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 gap-6 pt-4">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Smart Crop Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced tools to monitor crop health, detect diseases early, and optimize growth patterns with AI-powered insights.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Livestock Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive tracking for animal health, productivity metrics, and automated health monitoring systems.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CloudRain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Weather Intelligence</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time weather monitoring, predictive analytics, and smart alerts to protect your crops and livestock.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm border border-border/50">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Data-Driven Decisions</h3>
                  <p className="text-sm text-muted-foreground">
                    Make informed decisions with comprehensive analytics, yield predictions, and resource optimization tools.
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
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;