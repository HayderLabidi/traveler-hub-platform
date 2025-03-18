import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "@/providers/DarkModeProvider";
import ChatbotButton from "@/components/Chatbot/ChatbotButton";

// Public pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";

// Auth pages
import Login from "./pages/auth/Login";
import DriverRegister from "./pages/auth/DriverRegister";
import PassengerRegister from "./pages/auth/PassengerRegister";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard pages
import DriverDashboard from "./pages/dashboard/DriverDashboard";
import PassengerDashboard from "./pages/dashboard/PassengerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import PaymentMethods from "./pages/dashboard/PaymentMethods";
import BookRide from "./pages/passenger/BookRide";
import PassengerProfile from "./pages/dashboard/PassengerProfile";

// Admin pages
import Users from "./pages/admin/Users";
import Drivers from "./pages/admin/Drivers";
import Rides from "./pages/admin/Rides";
import Payments from "./pages/admin/Payments";
import Support from "./pages/admin/Support";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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

            {/* Driver routes */}
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/driver/profile" element={<Profile />} />
            <Route path="/driver/settings" element={<Settings />} />

            {/* Passenger routes */}
            <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
            <Route path="/passenger/profile" element={<PassengerProfile />} />
            <Route path="/book-ride" element={<BookRide />} />

            {/* Shared routes */}
            <Route path="/payment-methods" element={<PaymentMethods />} />

            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/drivers" element={<Drivers />} />
            <Route path="/admin/rides" element={<Rides />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/support" element={<Support />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotButton />
        </BrowserRouter>
      </TooltipProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);

export default App; 