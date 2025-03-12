
import { Link } from "react-router-dom";
import { useDarkMode } from "@/providers/DarkModeProvider";
import NavBar from "@/components/NavBar";

const About = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-background">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-24 pb-16 px-4 md:px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About RideShare</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              At RideShare, our mission is to provide safe, convenient, and affordable transportation 
              options that connect people and communities while reducing traffic congestion and 
              environmental impact.
            </p>
            <p>
              We believe in creating a platform that benefits both drivers looking to earn extra income 
              and passengers seeking reliable transportation alternatives.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="mb-4">
              RideShare was founded in 2023 by a team of transportation enthusiasts who saw the 
              need for better ride-sharing options. What started as a small local operation has 
              quickly grown to serve multiple cities across the country.
            </p>
            <p>
              Our journey continues as we expand our services and improve our technology to provide 
              the best possible experience for our users.
            </p>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-md mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-md">
              <h3 className="text-xl font-medium mb-2">Safety First</h3>
              <p>We prioritize the safety of our users above all else, with rigorous driver screening and continuous monitoring.</p>
            </div>
            <div className="p-4 border border-border rounded-md">
              <h3 className="text-xl font-medium mb-2">Sustainability</h3>
              <p>We're committed to reducing carbon emissions by making ride-sharing an attractive alternative to individual car ownership.</p>
            </div>
            <div className="p-4 border border-border rounded-md">
              <h3 className="text-xl font-medium mb-2">Community</h3>
              <p>We build connections between people and strengthen communities through accessible transportation.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Whether you're looking to earn as a driver or need convenient rides as a passenger, 
            we invite you to be part of the RideShare community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/driver/register" 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Become a Driver
            </Link>
            <Link 
              to="/register" 
              className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
            >
              Sign Up as Passenger
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
