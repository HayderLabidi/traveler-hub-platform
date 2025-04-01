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

const Index = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Commuter",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote: "RideShare has completely transformed my daily commute. I save money, meet interesting people, and reduce my carbon footprint!",
      rating: 5,
      stats: { rides: 45, saved: "$890" }
    },
    {
      name: "Michael Chen",
      role: "Weekend Traveler",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      quote: "As someone who travels between cities every weekend, RideShare has been a game-changer. The app is intuitive and finding rides is super easy.",
      rating: 5,
      stats: { rides: 32, saved: "$650" }
    },
    {
      name: "Priya Patel",
      role: "Driver Partner",
      image: "https://randomuser.me/api/portraits/women/63.jpg",
      quote: "I was looking for a way to offset my car expenses. Now I share my ride with others and it covers my gas and maintenance costs!",
      rating: 4,
      stats: { rides: 128, earned: "$2,450" }
    },
  ];

  const popularDrivers = [
    {
      name: "Alex Thompson",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.9,
      trips: 128,
      car: "Tesla Model 3",
      verified: true,
      languages: ["English", "Spanish"],
      bio: "Professional driver with 5+ years of experience. Clean car, safe driving, and great conversation!"
    },
    {
      name: "Maria Garcia",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4.8,
      trips: 95,
      car: "Toyota Camry",
      verified: true,
      languages: ["English", "Spanish", "French"],
      bio: "Friendly driver who loves meeting new people. Regular commuter between major cities."
    },
    {
      name: "David Chen",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5.0,
      trips: 156,
      car: "Honda Civic",
      verified: true,
      languages: ["English", "Mandarin"],
      bio: "Top-rated driver with perfect safety record. Comfortable car with premium features."
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
                      onClick={handleDriveWithUs}
                    >
                      Drive with us
                      <Car className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button 
                      size="lg"
                      className="group dark:border-white dark:text-white dark:hover:bg-white/10 dark:variant-outline"
                      onClick={handleRideWithUs}
                    >
                      Ride with us
                      <Users className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
            <motion.div 
              className="hidden lg:block rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <img 
                src="/Carpool.gif" 
                alt="People carpooling" 
                className="w-full h-[400px] object-cover transform transition-all duration-500 hover:scale-105" 
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose RideShare?</h2>
            <p className="text-muted-foreground">
              Experience the future of transportation with our innovative carpooling platform
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/50">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">
              Join thousands of satisfied users who have transformed their travel experience
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                          {testimonial.stats.rides}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Rides</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                          {testimonial.stats.saved || testimonial.stats.earned}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.stats.saved ? "Money Saved" : "Money Earned"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popular Drivers Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Drivers</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Meet our most trusted and experienced drivers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDrivers.map((driver, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={driver.image} 
                      alt={driver.name} 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{driver.name}</h3>
                        {driver.verified && (
                          <Shield className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600">{driver.rating}</span>
                        <span className="text-sm text-gray-500">({driver.trips} trips)</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      <Car className="inline-block mr-1 h-4 w-4" />
                      {driver.car}
                    </p>
                    <p className="text-sm text-gray-600">
                      <Users className="inline-block mr-1 h-4 w-4" />
                      {driver.languages.join(", ")}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{driver.bio}</p>
                  <Button className="w-full group">
                    View Profile
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button onClick={() => navigate('/passenger/book-ride')} className="group">
              View All Drivers
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60" />
        <div className="absolute inset-0 bg-grid-white/10" />
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of travelers who are already saving money and reducing their carbon footprint
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!isAuthenticated && (
                <>
                  <Button 
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 group"
                    onClick={handleDriveWithUs}
                  >
                    Drive with us
                    <Car className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    size="lg"
                    className="group dark:border-white dark:text-white dark:hover:bg-white/10 dark:variant-outline"
                    onClick={handleRideWithUs}
                  >
                    Ride with us
                    <Users className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-white/80">Active Users</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-white/80">Completed Rides</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-white/80">CO₂ Saved (kg)</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      {!isAuthenticated && (
        <section className="py-24 bg-muted/30">
          <motion.div 
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-8">
                Get notified about new features, success stories, and travel tips
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-input bg-background"
                />
                <Button className="group">
                  Subscribe
                  <Mail className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </section>
      )}

      <Footer />
      
      <ChatbotButton />

      {/* Floating Action Button with Flash Effect */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                duration: 0.3
              }
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-8 left-8 z-50"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0, 0, 0, 0)",
                  "0 0 0 20px rgba(0, 0, 0, 0.1)",
                  "0 0 0 0 rgba(0, 0, 0, 0)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Button
                size="icon"
                className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all group"
                onClick={scrollToTop}
              >
                <Rocket className="h-6 w-6 transition-transform group-hover:-translate-y-1" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
