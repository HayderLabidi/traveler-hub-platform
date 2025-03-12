
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const NavBar = ({ isDarkMode, toggleDarkMode }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-500">RideShare</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Button 
                variant="outline" 
                className="ml-4"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button 
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-in-right">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background shadow-lg">
            <Link to="/" className="block nav-link">Home</Link>
            <Link to="/about" className="block nav-link">About</Link>
            <Link to="/contact" className="block nav-link">Contact</Link>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
            >
              Log in
            </Button>
            <Button 
              className="w-full mt-2"
              onClick={() => {
                navigate("/register");
                setIsMenuOpen(false);
              }}
            >
              Sign up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
