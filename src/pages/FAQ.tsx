
import { useState } from "react";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const FAQ = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqItems = [
    {
      question: "How do I sign up as a passenger?",
      answer: "To sign up as a passenger, click on the 'Sign up' button in the navigation bar, then select 'Passenger' and fill in your details. Once registered, you can immediately start booking rides."
    },
    {
      question: "How do I become a driver?",
      answer: "To become a driver, click on the 'Sign up' button, select 'Driver', and complete the registration form. You'll need to provide additional information like your vehicle details and license. Our team will review your application and you'll be notified once approved."
    },
    {
      question: "How do I book a ride?",
      answer: "After logging in to your passenger account, navigate to your dashboard and click on 'Book Now'. Enter your pickup location, destination, and preferred time. You'll see available drivers and can choose one based on ratings and estimated arrival time."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit and debit cards, as well as digital payment methods like Apple Pay and Google Pay. You can add and manage your payment methods in your account settings."
    },
    {
      question: "How are fares calculated?",
      answer: "Fares are calculated based on distance, time, and current demand. Before confirming your ride, you'll see an estimated fare. Additional charges may apply for tolls, airport fees, or waiting time."
    },
    {
      question: "Can I schedule a ride in advance?",
      answer: "Yes, you can schedule rides up to 7 days in advance. Simply select the 'Schedule' option when booking a ride and choose your preferred date and time."
    },
    {
      question: "How do I contact my driver?",
      answer: "Once a driver accepts your ride request, you can contact them through the in-app messaging or calling feature. Your driver's name, vehicle details, and contact options will be visible in your active ride screen."
    },
    {
      question: "What if I leave something in the vehicle?",
      answer: "If you leave something in a vehicle, you can report a lost item through the 'Trip History' section in your account. We'll help you get in touch with your driver to arrange for the return of your items."
    },
    {
      question: "How do I report an issue with my ride?",
      answer: "You can report issues through the 'Help' section in your account or directly from your trip history. Select the specific ride and click 'Report an issue'. Our support team will respond to your concern promptly."
    },
    {
      question: "Can I cancel my ride?",
      answer: "Yes, you can cancel a ride at any time, but cancellation fees may apply if the driver is already on the way or close to your pickup location. You'll be informed of any fees before confirming the cancellation."
    }
  ];
  
  const filteredFAQs = searchQuery
    ? faqItems.filter(
        item =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-12 mt-16 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h1>
          <p className="text-center text-muted-foreground mb-8">
            Find answers to common questions about our ride-sharing platform
          </p>
          
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg px-1">
                  <AccordionTrigger className="text-left px-4 py-3 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center p-8 border rounded-lg">
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              <p className="text-sm mt-2">Try searching with different keywords or browse all FAQs</p>
            </div>
          )}
          
          <div className="mt-12 text-center p-6 bg-muted rounded-xl">
            <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
            <p className="mb-4">Our support team is here to help you with any other questions you may have.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="text-brand-500 hover:underline">Contact Support</a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <a href="/about" className="text-brand-500 hover:underline">About Us</a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
