
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Search, 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Phone, 
  BookOpen, 
  AlertCircle, 
  CreditCard, 
  User, 
  Car, 
  Clock,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HelpCentre = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const helpCategories = [
    { id: "account", name: "Account", icon: User },
    { id: "booking", name: "Booking", icon: Car },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "issues", name: "Issues", icon: AlertCircle },
    { id: "policies", name: "Policies", icon: BookOpen },
  ];
  
  const faqs = {
    account: [
      {
        id: 1,
        question: "How do I change my profile information?",
        answer: "Go to your Profile page accessible from the dashboard menu. Click the Edit Profile button to update your personal information, profile picture, and contact details."
      },
      {
        id: 2,
        question: "How can I reset my password?",
        answer: "Click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you a link to reset your password. If you're already logged in, you can change your password from the Settings page."
      },
      {
        id: 3,
        question: "How do I delete my account?",
        answer: "To delete your account, go to Settings and scroll to the Account Management section. Click on 'Delete Account' and follow the confirmation steps. Please note that this action is irreversible and all your data will be permanently deleted."
      }
    ],
    booking: [
      {
        id: 1,
        question: "How do I book a ride?",
        answer: "To book a ride, click on the 'Book a Ride' button on your dashboard. Enter your pickup location, destination, preferred time, and the number of passengers. You can then choose from available drivers and confirm your booking."
      },
      {
        id: 2,
        question: "Can I schedule a ride in advance?",
        answer: "Yes, you can schedule rides up to 7 days in advance. On the booking page, select the date and time for your future ride. You'll receive confirmation once a driver accepts your scheduled ride request."
      },
      {
        id: 3,
        question: "How do I cancel a ride?",
        answer: "To cancel a booked ride, go to 'My Bookings' on your dashboard, find the ride you want to cancel, and click the 'Cancel' button. Please note that cancellations made less than 1 hour before the scheduled pickup may incur a cancellation fee."
      }
    ],
    payment: [
      {
        id: 1,
        question: "What payment methods are accepted?",
        answer: "We accept all major credit and debit cards, including Visa, Mastercard, and American Express. In some regions, we also support payment through digital wallets like PayPal, Apple Pay, and Google Pay."
      },
      {
        id: 2,
        question: "How do I add a new payment method?",
        answer: "Go to the Payment Methods page from your dashboard. Click on 'Add Payment Method' and enter your card details. Your information is securely stored using industry-standard encryption."
      },
      {
        id: 3,
        question: "When am I charged for a ride?",
        answer: "For immediate rides, you're charged once the ride is completed. For scheduled rides, a temporary authorization hold may be placed on your payment method, but you'll only be charged after the ride is completed."
      }
    ],
    issues: [
      {
        id: 1,
        question: "What if my driver doesn't show up?",
        answer: "If your driver hasn't arrived within 5 minutes of the estimated arrival time, you can contact them through the app. If you're unable to reach them, you can cancel the ride without a cancellation fee and book another driver."
      },
      {
        id: 2,
        question: "I left an item in the car. What should I do?",
        answer: "Report a lost item immediately through the 'Report an Issue' section. Provide details about the item and the ride. We'll contact the driver on your behalf and facilitate the return of your belongings."
      },
      {
        id: 3,
        question: "How do I report a safety concern?",
        answer: "Your safety is our priority. If you experience any safety issues during a ride, report it immediately through the 'Safety Report' option in the Help section. For emergencies, always contact local authorities first."
      }
    ],
    policies: [
      {
        id: 1,
        question: "What is the cancellation policy?",
        answer: "You can cancel a ride anytime, but cancellations made less than 1 hour before the scheduled pickup may incur a fee. The fee amount depends on your region and is displayed before you confirm the cancellation."
      },
      {
        id: 2,
        question: "What's the pet policy?",
        answer: "Service animals are always allowed. For other pets, it depends on the driver's preference. You can message your driver before the ride to ask if they accept pets. We recommend bringing a pet carrier for small animals."
      },
      {
        id: 3,
        question: "What is the luggage policy?",
        answer: "Standard rides accommodate 1-2 pieces of luggage per passenger. If you have extra luggage, consider booking a larger vehicle. Drivers are not obligated to help with loading and unloading, but many do so as a courtesy."
      }
    ]
  };
  
  const filteredFaqs = Object.entries(faqs).flatMap(([category, questions]) => 
    questions.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(faq => ({
      ...faq,
      category
    }))
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-bold mb-2">Help Centre</h1>
          <p className="text-muted-foreground mb-6">Find answers to your questions or contact our support team</p>
        </div>

        {/* Hero Search */}
        <Card className="mb-10 bg-gradient-to-r from-primary/10 via-primary/5 to-background border-none">
          <CardContent className="p-8">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">How can we help you today?</h2>
              <p className="text-muted-foreground">
                Search our knowledge base or browse through the categories below
              </p>
              <div className="relative max-w-xl mx-auto mt-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for help..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <MessageSquare className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium mb-1">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Chat with our support team in real-time
              </p>
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                Available 24/7
              </Badge>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Mail className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium mb-1">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get help via email within 24 hours
              </p>
              <Button variant="outline" size="sm">
                support@rideshare.com
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Phone className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium mb-1">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Call us for urgent assistance
              </p>
              <Button variant="outline" size="sm">
                1-800-RIDE-HELP
              </Button>
            </CardContent>
          </Card>
        </div>

        {searchQuery ? (
          <Card className="mb-10">
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {filteredFaqs.length} results for "{searchQuery}"
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem key={`${faq.category}-${faq.id}`} value={`${faq.category}-${faq.id}`}>
                      <AccordionTrigger>
                        <div className="flex items-center text-left">
                          <span>{faq.question}</span>
                          <Badge className="ml-2 capitalize" variant="outline">
                            {faq.category}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any FAQs matching your search.
                  </p>
                  <Button onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="account">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-6">
              {helpCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex gap-2">
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {helpCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className="h-5 w-5" />
                      <span>{category.name} FAQs</span>
                    </CardTitle>
                    <CardDescription>
                      Frequently asked questions about {category.name.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs[category.id].map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id.toString()}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
                
                {/* Popular Articles */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Popular Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium leading-tight">
                              {category.name} guide: {i === 1 ? 'Getting started' : i === 2 ? 'Advanced tips' : i === 3 ? 'Troubleshooting' : 'Best practices'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {i === 1 ? '3 min read' : i === 2 ? '5 min read' : i === 3 ? '7 min read' : '4 min read'}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Contact Form */}
        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>
              Our support team is here to assist you with any issues or questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What's this about?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Describe your issue or question..."
                    />
                  </div>
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Support Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Monday to Friday: 9 AM - 8 PM<br />
                        Saturday & Sunday: 10 AM - 6 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Call Us</h4>
                      <p className="text-sm text-muted-foreground">
                        Toll-free: 1-800-RIDE-HELP<br />
                        International: +1-555-123-4567
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email Support</h4>
                      <p className="text-sm text-muted-foreground">
                        General Inquiries: info@rideshare.com<br />
                        Support Team: support@rideshare.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HelpCentre;
