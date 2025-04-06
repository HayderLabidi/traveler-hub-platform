import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">RideShare</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Connecting drivers and passengers for efficient, affordable, and sustainable travel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Blog</Link></li>
              <li><Link to="/press" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Help Center</Link></li>
              <li><Link to="/safety" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Safety</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-500" />
                <a href="mailto:info@rideshare.com" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">
                  info@rideshare.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-500" />
                <a href="tel:+1-555-123-4567" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">
                  +216 29019040
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} RideShare by Hayder and Jacer. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
              <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 