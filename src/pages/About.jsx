import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Car, Globe2, Leaf, Award, Heart, ArrowUp, Rocket } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDarkMode } from '@/providers/DarkModeProvider';

const About = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
        staggerChildren: 0.2
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

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Rides Completed', value: '100K+', icon: Car },
    { label: 'Cities', value: '100+', icon: Globe2 },
    { label: 'CO₂ Saved', value: '500K+ kg', icon: Leaf }
  ];

  const values = [
    {
      title: 'Trust & Safety',
      description: 'We prioritize the safety of our community through thorough verification processes and insurance coverage.',
      icon: Award
    },
    {
      title: 'Community',
      description: 'Building connections and fostering a supportive environment for all our users.',
      icon: Heart
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="flex-grow">
        <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 dark:from-primary dark:to-primary/60" />
          <div className="absolute inset-0 bg-grid-white/10" />
          <motion.div 
            className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              About Us
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-3xl mx-auto text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              We're on a mission to revolutionize the way people travel by making carpooling more accessible, 
              sustainable, and community-driven.
            </motion.p>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-colors duration-200`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-muted/30">
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="text-center mb-12"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Starting from a simple idea to connect travelers, we've grown into a platform that brings 
                together thousands of people who share more than just rides – they share experiences.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg transition-colors duration-200`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className={`py-24 ${isDarkMode ? 'bg-dark-primary' : 'bg-primary'} text-white`}>
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">Ready to Join Our Community?</h2>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 group"
            >
              Get Started
              <Car className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </section>
      </div>
      <Footer />

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
                className={`rounded-full w-14 h-14 ${isDarkMode ? 'bg-dark-primary' : 'bg-primary'} hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all group`}
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

export default About;