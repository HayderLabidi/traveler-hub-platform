import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const BookRide = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bookingType, setBookingType] = useState("now");
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [rideDetails, setRideDetails] = useState({
    pickup: "",
    dropoff: "",
    time: "Now"
  });
  
  const [availableRides, setAvailableRides] = useState([
    { id: 1, type: "Standard", price: "$12.50", time: "3 min away", driver: "John D.", rating: 4.8 },
    { id: 2, type: "Premium", price: "$18.75", time: "5 min away", driver: "Sarah M.", rating: 4.9 },
    { id: 3, type: "XL", price: "$22.00", time: "7 min away", driver: "Mike J.", rating: 4.7 }
  ]);
  
  const [selectedRide, setSelectedRide] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRideDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to search for available rides
    setTimeout(() => {
      setIsLoading(false);
      
      if (!rideDetails.pickup || !rideDetails.dropoff) {
        toast({
          title: "Error",
          description: "Please fill in both pickup and dropoff locations.",
          variant: "destructive"
        });
        return;
      }
      
      // Show available rides
      setAvailableRides([
        { id: 1, type: "Standard", price: "$12.50", time: "3 min away", driver: "John D.", rating: 4.8 },
        { id: 2, type: "Premium", price: "$18.75", time: "5 min away", driver: "Sarah M.", rating: 4.9 },
        { id: 3, type: "XL", price: "$22.00", time: "7 min away", driver: "Mike J.", rating: 4.7 }
      ]);
      
      toast({
        title: "Rides found",
        description: "We found several available rides for your trip.",
      });
    }, 1500);
  };
  
  const handleBookRide = () => {
    if (!selectedRide) {
      toast({
        title: "Select a ride",
        description: "Please select a ride type to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to book the ride
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Ride booked!",
        description: bookingType === "now" 
          ? "Your driver is on the way." 
          : "Your ride has been scheduled.",
      });
      
      navigate("/passenger/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-8 mt-16 flex-grow">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Book a Ride</h1>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Dashboard
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ride Details</CardTitle>
              <CardDescription>
                Enter your pickup and destination locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="now" 
                value={bookingType} 
                onValueChange={(value) => setBookingType(value)}
                className="mb-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="now">Ride Now</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="pickup"
                      name="pickup"
                      placeholder="Enter pickup address"
                      value={rideDetails.pickup}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dropoff">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dropoff"
                      name="dropoff"
                      placeholder="Enter destination address"
                      value={rideDetails.dropoff}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                {bookingType === "schedule" && (
                  <div className="flex flex-col space-y-2">
                    <Label>Pickup Date & Time</Label>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal flex-1",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      
                      <div className="relative flex-1">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          className="pl-10"
                          defaultValue="12:00"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Find Rides"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {availableRides.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Available Rides</CardTitle>
                <CardDescription>
                  Select your preferred ride option
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableRides.map((ride) => (
                    <div 
                      key={ride.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedRide === ride.id 
                          ? "border-brand-500 bg-brand-50 dark:bg-brand-950"
                          : "hover:border-brand-200"
                      }`}
                      onClick={() => setSelectedRide(ride.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{ride.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.time} • Driver: {ride.driver} ({ride.rating})
                          </div>
                        </div>
                        <div className="font-medium text-lg">
                          {ride.price}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    className="w-full mt-4" 
                    disabled={!selectedRide || isLoading}
                    onClick={handleBookRide}
                  >
                    {isLoading ? "Booking..." : "Book Selected Ride"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookRide;