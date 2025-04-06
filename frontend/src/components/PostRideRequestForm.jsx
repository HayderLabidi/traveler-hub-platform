
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const PostRideRequestForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    date: new Date(),
    time: "",
    seats: 1,
    additionalInfo: "",
    maxBudget: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Ride request posted!",
        description: "Drivers will be notified of your request."
      });
      
      // Pass the actual form data to the onSuccess callback
      if (onSuccess) {
        const newRequest = {
          id: Date.now(),
          from: formData.fromLocation,
          to: formData.toLocation,
          date: `${format(formData.date, "PPP")}, ${formData.time}`,
          responses: 0,
          status: "Active"
        };
        
        onSuccess(newRequest);
      }
      
      // Reset form
      setFormData({
        fromLocation: "",
        toLocation: "",
        date: new Date(),
        time: "",
        seats: 1,
        additionalInfo: "",
        maxBudget: ""
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Ride Request</CardTitle>
        <CardDescription>Let drivers know where you need to go</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromLocation">From</Label>
              <div className="flex">
                <Input 
                  id="fromLocation"
                  name="fromLocation"
                  placeholder="Starting location"
                  value={formData.fromLocation}
                  onChange={handleInputChange}
                  required
                  className="rounded-r-none"
                />
                <Button 
                  type="button"
                  variant="outline" 
                  className="rounded-l-none border-l-0" 
                  onClick={() => {
                    // Get current location functionality would go here
                    setFormData(prev => ({
                      ...prev,
                      fromLocation: "Current Location"
                    }));
                  }}
                >
                  <MapPin size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="toLocation">To</Label>
              <Input 
                id="toLocation"
                name="toLocation"
                placeholder="Destination"
                value={formData.toLocation}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="flex">
                <Input 
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="rounded-r-none"
                />
                <Button 
                  type="button"
                  variant="outline" 
                  className="rounded-l-none border-l-0"
                  onClick={() => {
                    const now = new Date();
                    const hours = now.getHours().toString().padStart(2, '0');
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    setFormData(prev => ({
                      ...prev,
                      time: `${hours}:${minutes}`
                    }));
                  }}
                >
                  <Clock size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seats">Seats Needed</Label>
              <Input 
                id="seats"
                name="seats"
                type="number"
                min="1"
                max="10"
                value={formData.seats}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maxBudget">Maximum Budget (optional)</Label>
            <Input 
              id="maxBudget"
              name="maxBudget"
              type="text"
              placeholder="e.g. $20"
              value={formData.maxBudget}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
            <Textarea 
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Add any details that might be helpful for drivers"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Ride Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostRideRequestForm;
