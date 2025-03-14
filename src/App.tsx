
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "@/providers/DarkModeProvider";
import ChatbotButton from "@/components/Chatbot/ChatbotButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import DriverRegister from "./pages/auth/DriverRegister";
import PassengerRegister from "./pages/auth/PassengerRegister";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DriverDashboard from "./pages/dashboard/DriverDashboard";
import PassengerDashboard from "./pages/dashboard/PassengerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";
import FAQ from "./pages/FAQ";
import EditProfile from "./pages/dashboard/EditProfile";
import PaymentMethods from "./pages/dashboard/PaymentMethods";
import BookRide from "./pages/passenger/BookRide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<PassengerRegister />} />
            <Route path="/driver/register" element={<DriverRegister />} />
            <Route path="/passenger/register" element={<PassengerRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/book-ride" element={<BookRide />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatbotButton />
        </BrowserRouter>
      </TooltipProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);

export default App;
