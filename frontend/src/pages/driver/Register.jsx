import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { FormFileUpload } from "@/components/ui/form-file-upload";
import { Car } from "lucide-react";

const DriverRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    driverLicense: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    licensePlate: "",
    seatsAvailable: "4",
    agreeToTerms: false,
  });
  
  const [carImage, setCarImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      
      // Basic validation
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.agreeToTerms) {
        toast({
          title: "Error",
          description: "You must agree to the terms and conditions",
          variant: "destructive",
        });
        return;
      }
      
      if (!formData.vehicleType) {
        toast({
          title: "Error",
          description: "Please select a vehicle type",
          variant: "destructive",
        });
        return;
      }

      if (!carImage) {
        toast({
          title: "Error",
          description: "Please upload an image of your car",
          variant: "destructive",
        });
        return;
      }
      
      // In a real app, you would upload the car image and send all data to the server
      // For now, we just simulate success
      
      navigate("/driver/dashboard");
      toast({
        title: "Success!",
        description: "Your driver account has been created",
      });
    }, 1000);
  };

  return (
    <AuthLayout
      title="Become a driver"
      subtitle="Sign up to start offering rides"
      userType="driver"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="driverLicense">Driver License Number</Label>
          <Input
            id="driverLicense"
            name="driverLicense"
            placeholder="DL12345678"
            value={formData.driverLicense}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Vehicle Information Section */}
        <div className="pt-2 border-t">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Car className="mr-2" size={20} />
            Vehicle Information
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("vehicleType", value)}
                value={formData.vehicleType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="minivan">Minivan</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicleModel">Vehicle Model</Label>
              <Input
                id="vehicleModel"
                name="vehicleModel"
                placeholder="Toyota Camry"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleYear">Vehicle Year</Label>
              <Input
                id="vehicleYear"
                name="vehicleYear"
                placeholder="2020"
                value={formData.vehicleYear}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vehicleColor">Vehicle Color</Label>
              <Input
                id="vehicleColor"
                name="vehicleColor"
                placeholder="Silver"
                value={formData.vehicleColor}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                name="licensePlate"
                placeholder="ABC123"
                value={formData.licensePlate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seatsAvailable">Available Seats</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("seatsAvailable", value)}
                value={formData.seatsAvailable}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 seats</SelectItem>
                  <SelectItem value="3">3 seats</SelectItem>
                  <SelectItem value="4">4 seats</SelectItem>
                  <SelectItem value="5">5 seats</SelectItem>
                  <SelectItem value="6">6 seats</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label>Car Image</Label>
            <FormFileUpload
              accept="image/*"
              onChange={(file) => setCarImage(file)}
              className="mt-2"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="agreeToTerms" 
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => 
              setFormData({...formData, agreeToTerms: checked})
            }
          />
          <label
            htmlFor="agreeToTerms"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            I agree to the{" "}
            <Link to="/terms" className="text-brand-500 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-brand-500 hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default DriverRegister; 