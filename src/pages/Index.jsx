
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronRight, 
  Car, 
  Users, 
  Clock, 
  Shield, 
  Mail, 
  Star, 
  ArrowRight, 
  MapPin, 
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useAuth } from "@/providers/AuthProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ChatbotButton from "@/components/Chatbot/ChatbotButton";
import { motion } from "framer-motion";

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, isAuthenticated } = useAuth();
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Commuter",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "RideShare has completely transformed my daily commute. I save money, meet interesting people, and reduce my carbon footprint!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Weekend Traveler",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      quote: "As someone who travels between cities every weekend, RideShare has been a game-changer. The app is intuitive and finding rides is super easy.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Driver Partner",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      quote: "I was looking for a way to offset my car expenses. Now I share my ride with others and it covers my gas and maintenance costs!",
      rating: 4,
    },
  ];

  const popularDestinations = [
    {
      from: "New York",
      to: "Boston",
      image: "https://images.unsplash.com/photo-1589083130544-0d6a2926e519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "$25-45",
    },
    {
      from: "San Francisco",
      to: "Los Angeles",
      image: "https://images.unsplash.com/photo-1597982087634-9dca7ee9dc70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "$35-60",
    },
    {
      from: "Chicago",
      to: "Detroit",
      image: "https://images.unsplash.com/photo-1564507789050-9778cfe083fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      price: "$20-40",
    },
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to appropriate dashboard based on user type
      switch (user.type) {
        case 'passenger':
          navigate('/passenger/dashboard');
          break;
        case 'driver':
          navigate('/driver/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/login');
      }
    } else {
      navigate('/register');
    }
  };

  const handleDriveWithUs = () => {
    if (isAuthenticated && user.type === 'driver') {
      navigate('/driver/dashboard');
    } else {
      navigate('/driver/register');
    }
  };

  const handleRideWithUs = () => {
    if (isAuthenticated && user.type === 'passenger') {
      navigate('/passenger/dashboard');
    } else {
      navigate('/passenger/register');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section - Updated with animations */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white mb-4">
                <Sparkles className="mr-1 h-3 w-3" />
                <span>New feature: In-app messaging</span>
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                Share the ride, <br /> share the cost
              </h1>
              <p className="text-xl mb-8 text-white/80 max-w-lg">
                Connect with drivers and passengers heading your way. Save money, reduce traffic, and help the environment.
              </p>
              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Button 
                    size="lg"
                    className="bg-white text-brand-600 hover:bg-gray-100 group"
                    onClick={handleGetStarted}
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg"
                      className="bg-white text-brand-600 hover:bg-gray-100 group"
                      onClick={handleDriveWithUs}
                    >
                      Drive
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white/10 group"
                      onClick={handleRideWithUs}
                    >
                      Ride
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="hidden lg:block rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-105 duration-500">
              <img 
                src="/Carpool.gif" 
                alt="People carpooling" 
                className="w-full h-[400px] object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with animations */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              RideShare makes carpooling simple, affordable, and eco-friendly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
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

      {/* Popular Routes Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Routes</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover frequently traveled routes with available rides.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img src={destination.image} alt={`${destination.from} to ${destination.to}`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <div className="flex items-center mb-2">
                    <MapPin size={16} className="mr-1" />
                    <p className="text-sm">{destination.from} - {destination.to}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{destination.price}</h3>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/20">
                      View Rides
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button onClick={() => navigate('/passenger/book-ride')} className="group">
              View All Routes
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real experiences from people who use RideShare every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <p className="italic text-gray-600 dark:text-gray-400 mb-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with better styling */}
      <section className="py-16 bg-brand-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join thousands of people who are already saving money and reducing their carbon footprint.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="bg-white text-brand-600 hover:bg-gray-100 px-8 group"
                onClick={handleGetStarted}
              >
                Go to Dashboard
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-white text-brand-600 hover:bg-gray-100 px-8 group"
                  onClick={handleDriveWithUs}
                >
                  Drive with us
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10 px-8 group"
                  onClick={handleRideWithUs}
                >
                  Ride with us
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
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
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all duration-200"
                />
                <Button className="group">
                  Subscribe
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
      
      <ChatbotButton />
    </div>
  );
};

export default Index;
