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
  Sparkles,
  Heart,
  MessageCircle,
  TrendingUp,
  Award,
  Rocket
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useAuth } from "@/providers/AuthProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ChatbotButton from "@/components/Chatbot/ChatbotButton";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from 'react';
import userService from '@/services/userService';

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [topDrivers, setTopDrivers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [driversData, testimonialsData] = await Promise.all([
          userService.getTopDrivers(),
          userService.getTestimonials()
        ]);
        setTopDrivers(driversData);
        setTestimonials(testimonialsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      title: "Connect with Drivers",
      description: "Find drivers heading your way and book a seat in their car.",
      icon: Car,
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Share Your Ride",
      description: "Offer your empty seats to others and split the costs of your journey.",
      icon: Users,
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "Save Time & Money",
      description: "Reduce travel costs and bypass traffic with carpool lanes.",
      icon: Clock,
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Travel Securely",
      description: "Verified profiles, ratings, and 24/7 customer support.",
      icon: Shield,
      color: "bg-orange-500/10 text-orange-500"
    },
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect to appropriate dashboard based on user type
      switch (user.role) {
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
    if (isAuthenticated && user.role === 'driver') {
      navigate('/driver/dashboard');
    } else {
      navigate('/driver/register');
    }
  };

  const handleRideWithUs = () => {
    if (isAuthenticated && user.role === 'passenger') {
      navigate('/passenger/dashboard');
    } else {
      navigate('/passenger/register');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60" />
        <div className="absolute inset-0 bg-grid-white/10" />
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <motion.span 
                className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="mr-1 h-3 w-3" />
                <span>New feature: In-app messaging</span>
              </motion.span>
              <motion.h1 
                className="text-4xl sm:text-6xl font-bold tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Share the ride, <br /> 
                <span className="text-white/90">share the cost</span>
              </motion.h1>
              <motion.p 
                className="text-xl mb-8 text-white/80 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Connect with drivers and passengers heading your way. Save money, reduce traffic, and help the environment.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {isAuthenticated ? (
                  <Button 
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 group"
                    onClick={handleGetStarted}
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg"
                      className="bg-white text-primary hover:bg-gray-100 group"
                      onClick={handleRideWithUs}
                    >
                      Ride with Us
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white/10 group"
                      onClick={handleDriveWithUs}
                    >
                      Drive with Us
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          </div>
      </section>

      {/* Top Drivers Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Top Drivers</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Meet our most trusted and experienced drivers who provide excellent service to our passengers.
            </p>
          </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {topDrivers.map((driver, index) => (
              <motion.div
                key={driver._id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={driver.profilePhoto || `https://ui-avatars.com/api/?name=${driver.firstName}+${driver.lastName}`}
                      alt={driver.firstName}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{driver.firstName} {driver.lastName}</h3>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1">{driver.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{driver.vehicleInfo.type} {driver.vehicleInfo.model}</p>
                  <div className="flex flex-wrap gap-2">
                    {driver.languages?.map((lang, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear from our community of drivers and passengers about their experiences.
            </p>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
            <motion.div
                key={testimonial._id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.user.profilePhoto || `https://ui-avatars.com/api/?name=${testimonial.user.firstName}+${testimonial.user.lastName}`}
                    alt={testimonial.user.firstName}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.user.firstName} {testimonial.user.lastName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.user.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{testimonial.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(testimonial.createdAt).toLocaleDateString()}
                  </div>
                </div>
            </motion.div>
            ))}
          </motion.div>
        </div>
        </section>

      <Footer />
      <ChatbotButton />
        {showScrollTop && (
        <button
                onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <ChevronRight className="h-6 w-6 transform rotate-270" />
        </button>
      )}
    </div>
  );
};

export default Index;
