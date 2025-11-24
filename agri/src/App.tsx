import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Index from "./pages/Index";
import CropScanner from "./pages/CropScanner";
import LivestockHealth from "./pages/LivestockHealth";
import Weather from "./pages/Weather";
import Analytics from "./pages/Analytics";
import CropAnalytics from "./pages/Crop-analytics";
import LivestockMetrics from "./pages/Livestock-metrics";
import WeatherTrends from "./pages/Weather-trends";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import FAQ from "./pages/Faq";
import AboutUs from "./pages/About";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes - Login is now the landing page */}
        <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        } />
        <Route path="/crop-scanner" element={
          <ProtectedRoute>
            <CropScanner />
          </ProtectedRoute>
        } />
        <Route path="/livestock-health" element={
          <ProtectedRoute>
            <LivestockHealth />
          </ProtectedRoute>
        } />
        <Route path="/weather" element={
          <ProtectedRoute>
            <Weather />
          </ProtectedRoute>
        } />
        
        {/* Analytics Routes */}
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/crop-analytics" element={
          <ProtectedRoute>
            <CropAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/livestock-metrics" element={
          <ProtectedRoute>
            <LivestockMetrics />
          </ProtectedRoute>
        } />
        <Route path="/weather-trends" element={
          <ProtectedRoute>
            <WeatherTrends />
          </ProtectedRoute>
        } />
        
        {/* Additional Pages */}
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/legal" element={<Legal />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;