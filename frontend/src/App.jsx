import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeProvider } from "@/providers/DarkModeProvider";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import ChatbotButton from "@/components/Chatbot/ChatbotButton";
import LoadingPage from "@/components/LoadingPage";

// Shared Pages
import Index from "@/pages/shared/Index";
import NotFound from "@/pages/shared/NotFound";
import About from "@/pages/shared/About";
import Contact from "@/pages/shared/Contact";
import FAQ from "@/pages/shared/FAQ";
import Login from "@/pages/shared/Login";
import ForgotPassword from "@/pages/shared/ForgotPassword";
import Settings from "@/pages/shared/Settings";
import Profile from "@/pages/shared/Profile";
import PaymentMethods from "@/pages/shared/PaymentMethods";

// Passenger Pages
import PassengerRegister from "@/pages/passenger/Register";
import PassengerDashboard from "@/pages/passenger/Dashboard";
import PassengerProfile from "@/pages/passenger/Profile";
import BookRide from "@/pages/passenger/BookRide";
import ScheduleRide from "@/pages/passenger/ScheduleRide";
import Blog from "@/pages/passenger/Blog";
import HelpCentre from "@/pages/passenger/HelpCentre";
import PassengerSettings from "@/pages/passenger/Settings";

// Driver Pages
import DriverRegister from "@/pages/driver/Register";
import DriverDashboard from "@/pages/driver/Dashboard";
import Verification from "@/pages/driver/Verification";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import Users from "@/pages/admin/Users";
import Drivers from "@/pages/admin/Drivers";
import Rides from "@/pages/admin/Rides";
import Payments from "@/pages/admin/Payments";
import Support from "@/pages/admin/Support";
import AdminSettings from "@/pages/admin/Settings";
import DriverVerifications from "@/pages/admin/DriverVerifications";

const queryClient = new QueryClient();

// Protected Route wrapper component
const ProtectedRoute = ({ children, allowedUserTypes }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedUserTypes && !allowedUserTypes.includes(user?.type)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<PassengerRegister />} />
      <Route path="/driver/register" element={<DriverRegister />} />
      <Route path="/passenger/register" element={<PassengerRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Driver routes */}
      <Route path="/driver/dashboard" element={
        <ProtectedRoute allowedUserTypes={['driver']}>
          <DriverDashboard />
        </ProtectedRoute>
      } />
      <Route path="/driver/profile" element={
        <ProtectedRoute allowedUserTypes={['driver']}>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/driver/settings" element={
        <ProtectedRoute allowedUserTypes={['driver']}>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/driver/verification" element={
        <ProtectedRoute allowedUserTypes={['driver']}>
          <Verification />
        </ProtectedRoute>
      } />

      {/* Protected Passenger routes */}
      <Route path="/passenger/dashboard" element={
        <ProtectedRoute allowedUserTypes={['passenger']}>
          <PassengerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/passenger/profile" element={
        <ProtectedRoute allowedUserTypes={['passenger']}>
          <PassengerProfile />
        </ProtectedRoute>
      } />
      <Route path="/passenger/settings" element={
        <ProtectedRoute allowedUserTypes={['passenger']}>
          <PassengerSettings />
        </ProtectedRoute>
      } />
      <Route path="/passenger/schedule" element={
        <ProtectedRoute allowedUserTypes={['passenger']}>
          <ScheduleRide />
        </ProtectedRoute>
      } />
      <Route path="/passenger/blog" element={
        <ProtectedRoute allowedUserTypes={['passenger']}>
          <Blog />
        </ProtectedRoute>
      } />
      <Route path="/passenger/help" element={
        <ProtectedRoute allowedUserTypes={['passenger']}>
          <HelpCentre />
        </ProtectedRoute>
      } />
      <Route path="/book-ride" element={
        <ProtectedRoute allowedUserTypes={['passenger']}>
          <BookRide />
        </ProtectedRoute>
      } />

      {/* Shared protected routes */}
      <Route path="/payment-methods" element={
        <ProtectedRoute allowedUserTypes={['passenger', 'driver']}>
          <PaymentMethods />
        </ProtectedRoute>
      } />

      {/* Protected Admin routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <Users />
        </ProtectedRoute>
      } />
      <Route path="/admin/drivers" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <Drivers />
        </ProtectedRoute>
      } />
      <Route path="/admin/rides" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <Rides />
        </ProtectedRoute>
      } />
      <Route path="/admin/payments" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <Payments />
        </ProtectedRoute>
      } />
      <Route path="/admin/support" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <Support />
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <AdminSettings />
        </ProtectedRoute>
      } />
      <Route path="/admin/verifications" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <DriverVerifications />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <LoadingPage />
              <div className="relative">
                <AppRoutes />
                <Toaster />
                <Sonner />
                <ChatbotButton />
              </div>
            </div>
          </TooltipProvider>
        </AuthProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
