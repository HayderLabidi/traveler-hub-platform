
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Car, Users, Clock, Shield, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/providers/DarkModeProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ChatbotButton from "@/components/Chatbot/ChatbotButton";
import Car3DModel from "@/components/3D/Car3DModel";
import FloatingElements from "@/components/3D/FloatingElements";

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const features = [
    {
      title: "Connect with Drivers",
      description: "Find drivers heading your way and book a seat in their car.",
      icon: Car,
    },
    {
      title: "Share Your Ride",
      description: "Offer your empty seats to others and split the costs of your journey.",
      icon: Users,
    },
    {
      title: "Save Time & Money",
      description: "Reduce travel costs and bypass traffic with carpool lanes.",
      icon: Clock,
    },
    {
      title: "Travel Securely",
      description: "Verified profiles, ratings, and 24/7 customer support.",
      icon: Shield,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section with 3D Car */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <FloatingElements height={600} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in relative z-10">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                Share the ride, <br /> share the cost
              </h1>
              <p className="text-xl mb-8 text-white/80 max-w-lg">
                Connect with drivers and passengers heading your way. Save money, reduce traffic, and help the environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-brand-600 hover:bg-gray-100"
                  onClick={() => navigate("/driver/register")}
                >
                  Drive
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => navigate("/passenger/register")}
                >
                  Ride
                </Button>
              </div>
            </div>
            <div className="hidden lg:block rounded-xl overflow-hidden shadow-xl">
              {/* Replace static image with 3D car model */}
              <div className="w-full h-[400px] relative">
                <Car3DModel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <FloatingElements height={500} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              RideShare makes carpooling simple, affordable, and eco-friendly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md card-hover">
                <CardContent className="p-6">
                  <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                    <feature.icon className="text-brand-500" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <FloatingElements height={300} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of people who are already saving money and reducing their carbon footprint.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => navigate("/driver/register")}
            >
              Drive with us
              <ChevronRight size={16} className="ml-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8"
              onClick={() => navigate("/passenger/register")}
            >
              Ride with us
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full">
                <Mail className="text-brand-500" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Stay updated</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Sign up for our newsletter to receive the latest news and promotions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      
      {/* Add the ChatbotButton component */}
      <ChatbotButton />
    </div>
  );
};

export default Index;
