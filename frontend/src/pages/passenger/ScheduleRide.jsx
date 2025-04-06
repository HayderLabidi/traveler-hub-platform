
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Car, 
  CalendarCheck, 
  ArrowRight
} from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ScheduleRide = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("09:00");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [savedLocations] = useState([
    { id: 1, name: "Home", address: "123 Home Street" },
    { id: 2, name: "Work", address: "456 Office Building" },
    { id: 3, name: "Gym", address: "789 Fitness Center" },
  ]);

  const times = [
    "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", 
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Ride Scheduled",
        description: `Your ride to ${destination} has been scheduled for ${format(date, "PPP")} at ${time}`,
      });
      navigate("/passenger/dashboard");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Schedule a Ride</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Trip Details</CardTitle>
            <CardDescription>
              Schedule a ride for a future date and time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {times.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Locations */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <div className="flex gap-3">
                    <Input
                      id="pickup"
                      placeholder="Enter pickup address"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Select onValueChange={(value) => setPickupLocation(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Saved locations" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedLocations.map((location) => (
                          <SelectItem key={location.id} value={location.address}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="flex gap-3">
                    <Input
                      id="destination"
                      placeholder="Enter destination address"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Select onValueChange={(value) => setDestination(value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Saved locations" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedLocations.map((location) => (
                          <SelectItem key={location.id} value={location.address}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Passengers */}
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers</Label>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "passenger" : "passengers"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                  {isSubmitting ? "Scheduling..." : "Schedule Ride"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Scheduled Rides */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Upcoming Scheduled Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <CalendarCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Home to Work</h4>
                    <p className="text-sm text-muted-foreground">Tomorrow, 08:30 AM</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <CalendarCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Home to Airport</h4>
                    <p className="text-sm text-muted-foreground">Saturday, 10:00 AM</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ScheduleRide;
