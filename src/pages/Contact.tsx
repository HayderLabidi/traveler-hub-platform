
import { useState } from "react";
import { useDarkMode } from "@/providers/DarkModeProvider";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-input rounded-md bg-background"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-2 border border-input rounded-md bg-background resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:support@rideshare.com" className="text-blue-500 hover:text-blue-600">
                      support@rideshare.com
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Phone className="mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+11234567890" className="text-blue-500 hover:text-blue-600">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <MapPin className="mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Office</p>
                    <address className="not-italic">
                      123 RideShare Blvd<br />
                      San Francisco, CA 94103<br />
                      United States
                    </address>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Support</h2>
              <p className="mb-4">
                For immediate assistance, please contact our 24/7 customer support team.
              </p>
              <Button variant="outline" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Call Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
