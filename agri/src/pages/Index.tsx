import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Leaf, 
  Stethoscope, 
  CloudRain, 
  Sprout, 
  TrendingUp, 
  Shield,
  Menu,
  X,
  BarChart3,
  PieChart,
  Activity,
  MessageCircle,
  User,
  HelpCircle,
  Users,
  FileText,
  LogOut,
  Home,
  Scan,
  Heart,
  Cloud
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ref, get } from "firebase/database";
import { database } from "@/firebase/config";

// Graph components
const LineGraph = ({ data, color = "bg-blue-500" }: { data: number[], color?: string }) => (
  <div className="w-full h-20 flex items-end gap-1">
    {data.map((value, index) => (
      <div
        key={index}
        className={`flex-1 ${color} rounded-t transition-all duration-300 hover:opacity-80`}
        style={{ height: `${(value / Math.max(...data)) * 100}%` }}
      />
    ))}
  </div>
);

const BarChart = ({ data, labels, color = "bg-green-500" }: { data: number[], labels: string[], color?: string }) => (
  <div className="w-full h-20 flex items-end justify-between gap-1">
    {data.map((value, index) => (
      <div key={index} className="flex flex-col items-center flex-1">
        <div className="text-xs text-muted-foreground mb-1">{labels[index]}</div>
        <div
          className={`w-full ${color} rounded-t transition-all duration-300 hover:opacity-80`}
          style={{ height: `${(value / Math.max(...data)) * 100}%` }}
        />
      </div>
    ))}
  </div>
);

const PieChartIndicator = ({ percentage, color = "bg-purple-500" }: { percentage: number, color?: string }) => (
  <div className="relative w-16 h-16">
    <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
    <div
      className={`absolute inset-0 rounded-full border-4 ${color} border-t-transparent border-r-transparent`}
      style={{
        transform: `rotate(${percentage * 3.6}deg)`
      }}
    ></div>
    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
      {percentage}%
    </div>
  </div>
);

// User interface
interface UserData {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  farmSize?: number;
  productionType?: string;
  crops?: string;
  livestock?: string;
  profilePicture?: string;
  createdAt?: string;
  updatedAt?: string;
}

const SideMenu = ({ isOpen, onClose, userData }: { isOpen: boolean; onClose: () => void; userData: UserData | null }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Activity, label: "Analytics", path: "/analytics" },
    { icon: BarChart3, label: "Crop Analytics", path: "/crop-analytics" },
    { icon: PieChart, label: "Livestock Metrics", path: "/livestock-metrics" },
    { icon: TrendingUp, label: "Weather Trends", path: "/weather-trends" },
    { icon: Scan, label: "Crop Scanner", path: "/crop-scanner" },
    { icon: Heart, label: "Livestock Health", path: "/livestock-health" },
    { icon: MessageCircle, label: "Chat", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: HelpCircle, label: "FAQ", path: "/faq" },
    { icon: Users, label: "About Us", path: "/about" },
    { icon: FileText, label: "Legal", path: "/legal" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Side Menu */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-background border-r border-border z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Agri-Connect</h2>
                <p className="text-xs text-muted-foreground">Smart Farming Platform</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User Profile Section */}
          {userData && (
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              {userData.profilePicture ? (
                <img 
                  src={userData.profilePicture} 
                  alt={userData.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {userData.name}
                </p>
                {userData.email && (
                  <p className="text-xs text-muted-foreground truncate">
                    {userData.email}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-border mt-auto">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();

  // Fetch user data from Firebase Realtime Database
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const userRef = ref(database, `farmers/${user.uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userDataFromDB = snapshot.val();
          setUserData({
            uid: user.uid,
            ...userDataFromDB
          });
        } else {
          // Fallback to auth user data if no farmer data found
          setUserData({
            uid: user.uid,
            name: user.name || 'User',
            email: user.email || '',
            profilePicture: user.profilePicture || ''
          });
        }
      } catch (error) {
        console.error("Error fetching user data from Firebase:", error);
        // Fallback to auth context data
        setUserData({
          uid: user.uid,
          name: user.name || 'User',
          email: user.email || '',
          profilePicture: user.profilePicture || ''
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getWelcomeMessage = () => {
    if (loading) {
      return "Welcome back!";
    }
    if (userData) {
      return `Welcome back, ${userData.name}!`;
    }
    return "Welcome back, Farmer!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Header with User Info */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-30 lg:left-80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between lg:justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* User Info Section - Top Right */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {userData?.name || 'Farmer'}
                </p>
                {userData?.email && (
                  <p className="text-xs text-muted-foreground">
                    {userData.email}
                  </p>
                )}
              </div>
              
              {/* User Avatar */}
              <div className="flex items-center gap-2">
                {userData?.profilePicture ? (
                  <img 
                    src={userData.profilePicture} 
                    alt={userData.name}
                    className="w-8 h-8 rounded-full object-cover border border-primary/20"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Logout Button for larger screens */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Side Menu */}
        <SideMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          userData={userData}
        />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Analytics Dashboard Section */}
          <section className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {userData ? `${userData.name}'s Farm Dashboard` : 'Farm Dashboard'}
              </h1>
              <p className="text-muted-foreground mb-8">Real-time insights and analytics for your farm</p>
              
              {/* Farm Type Badge */}
              {userData?.productionType && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  {userData.productionType === 'crops' && <Sprout className="w-4 h-4" />}
                  {userData.productionType === 'livestock' && <Heart className="w-4 h-4" />}
                  {userData.productionType === 'both' && (
                    <>
                      <Sprout className="w-4 h-4" />
                      <Heart className="w-4 h-4" />
                    </>
                  )}
                  {userData.productionType.charAt(0).toUpperCase() + userData.productionType.slice(1)} Farmer
                  {userData.farmSize && ` • ${userData.farmSize} acres`}
                </div>
              )}
              
              {/* Main Analytics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                      Crop Health Overview
                    </CardTitle>
                    <CardDescription>Current status of all monitored crops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineGraph data={[65, 70, 75, 80, 85, 92, 88]} color="bg-green-500" />
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-muted-foreground">Weekly Trend</span>
                      <span className="text-green-600 font-semibold">+27%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                      </div>
                      Livestock Health
                    </CardTitle>
                    <CardDescription>Animal health metrics and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart 
                      data={[85, 92, 78, 95, 88]} 
                      labels={['Cattle', 'Poultry', 'Swine', 'Sheep', 'Goats']} 
                      color="bg-blue-500" 
                    />
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-muted-foreground">Overall Health</span>
                      <span className="text-blue-600 font-semibold">87.6%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <CloudRain className="w-5 h-5 text-purple-600" />
                      </div>
                      Weather Impact
                    </CardTitle>
                    <CardDescription>Weather conditions and predictions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PieChartIndicator percentage={72} color="bg-purple-500" />
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-muted-foreground">Favorable Conditions</span>
                      <span className="text-purple-600 font-semibold">72%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Metrics Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Soil Moisture</p>
                        <p className="text-2xl font-bold">64%</p>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        +3%
                      </div>
                    </div>
                    <LineGraph data={[45, 50, 55, 60, 64]} color="bg-amber-500" />
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pest Risk</p>
                        <p className="text-2xl font-bold">22%</p>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        -8%
                      </div>
                    </div>
                    <BarChart data={[30, 25, 22]} labels={['Mon', 'Tue', 'Wed']} color="bg-red-500" />
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                        <p className="text-2xl font-bold">78%</p>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        +12%
                      </div>
                    </div>
                    <LineGraph data={[50, 58, 65, 70, 78]} color="bg-emerald-500" />
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Yield Quality</p>
                        <p className="text-2xl font-bold">91%</p>
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        +5%
                      </div>
                    </div>
                    <PieChartIndicator percentage={91} color="bg-indigo-500" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Quick Actions Section */}
          <section className="container mx-auto px-4 py-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link to="/crop-scanner">
                  <Card className="h-full shadow-card hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-success to-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Leaf className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle>Crop Disease Detection</CardTitle>
                      <CardDescription>
                        Upload leaf images for instant AI-powered disease diagnosis with treatment recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      <p>✓ 38+ disease detection</p>
                      <p>✓ Confidence scoring</p>
                      <p>✓ Treatment protocols</p>
                      <p>✓ Prevention guidance</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/livestock-health">
                  <Card className="h-full shadow-card hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Stethoscope className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle>Livestock Health Diagnostics</CardTitle>
                      <CardDescription>
                        Describe symptoms to get AI-powered health assessments and care instructions
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      <p>✓ Symptom analysis</p>
                      <p>✓ Urgency assessment</p>
                      <p>✓ Immediate care steps</p>
                      <p>✓ Vet recommendations</p>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/weather">
                  <Card className="h-full shadow-card hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <CloudRain className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle>Weather Intelligence</CardTitle>
                      <CardDescription>
                        Get seasonal insights and weather-based farming recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      <p>✓ 7-day forecasts</p>
                      <p>✓ Planting advisories</p>
                      <p>✓ Irrigation scheduling</p>
                      <p>✓ Disease risk alerts</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <Sprout className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Increase Yield</h3>
                  <p className="text-muted-foreground">
                    Early disease detection helps protect your crops and maximize harvest
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Save Costs</h3>
                  <p className="text-muted-foreground">
                    Targeted treatments and preventive care reduce unnecessary expenses
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Peace of Mind</h3>
                  <p className="text-muted-foreground">
                    24/7 AI-powered monitoring keeps your farm protected
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;