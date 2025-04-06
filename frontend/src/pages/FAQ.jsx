import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageSquare, HelpCircle, Rocket, ArrowUp } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDarkMode } from '@/providers/DarkModeProvider';

const FAQ = () => {
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

  const categories = [
    {
      title: 'Getting Started',
      questions: [
        {
          q: 'How do I sign up as a driver?',
          a: 'To sign up as a driver, click on the "Drive with us" button and fill out the registration form. You\'ll need to provide your driver\'s license, insurance information, and vehicle details.'
        },
        {
          q: 'What are the requirements to be a passenger?',
          a: 'To be a passenger, you need to be at least 18 years old and create an account with a valid email address and phone number for verification.'
        },
        {
          q: 'Is my personal information secure?',
          a: 'Yes, we use industry-standard encryption and security measures to protect your personal information. We never share your data with unauthorized parties.'
        }
      ]
    },
    {
      title: 'Rides & Payments',
      questions: [
        {
          q: 'How do I book a ride?',
          a: 'Search for your destination, choose from available rides, and click "Book Now". You can pay through our secure payment system using credit/debit cards or other supported payment methods.'
        },
        {
          q: 'What payment methods are accepted?',
          a: 'We accept major credit/debit cards, PayPal, and other digital payment methods. All transactions are processed securely through our platform.'
        },
        {
          q: 'Can I cancel my ride?',
          a: 'Yes, you can cancel your ride up to 24 hours before the scheduled departure time for a full refund. Cancellations within 24 hours may be subject to a fee.'
        }
      ]
    },
    {
      title: 'Safety & Support',
      questions: [
        {
          q: 'What safety measures are in place?',
          a: 'We verify all drivers and passengers, provide real-time ride tracking, and have a 24/7 support team. All rides are also covered by our insurance policy.'
        },
        {
          q: 'What if I leave something in the car?',
          a: 'Contact our support team immediately through the app or website. We\'ll help coordinate with the driver to retrieve your belongings.'
        },
        {
          q: 'How can I report an issue?',
          a: 'Use the "Report" button in your ride details or contact our support team. We take all reports seriously and investigate thoroughly.'
        }
      ]
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
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 max-w-3xl mx-auto text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Find answers to common questions about our platform and services.
            </motion.p>
            
            <motion.div 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <Input 
                  type="search" 
                  placeholder="Search for answers..." 
                  className="w-full pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Categories */}
        <section className="py-24">
          <motion.div 
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div 
                key={category.title}
                variants={itemVariants}
                className="mb-12 last:mb-0"
              >
                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                      <AccordionTrigger className="text-left">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Still Need Help */}
        <section className="py-24 bg-muted/30">
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
              <p className="text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to help you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="group">
                  Contact Support
                  <MessageSquare className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="group">
                  Browse Help Center
                  <HelpCircle className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

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
    </div>
  );
};

export default FAQ;