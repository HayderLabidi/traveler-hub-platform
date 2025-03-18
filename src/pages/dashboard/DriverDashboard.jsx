import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { 
  Car, 
  Users, 
  Clock, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star, 
  Settings, 
  Plus, 
  Edit2,
  LogOut
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const DriverDashboard = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isOnline, setIsOnline] = useState(false);
  const [showPostRide, setShowPostRide] = useState(false);
  const [newRide, setNewRide] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: "",
    price: "",
    notes: ""
  });

  const [rideRequests, setRideRequests] = useState([
    {
      id: 1,
      passenger: "John Doe",
      from: "New York",
      to: "Boston",
      date: "2024-03-20",
      time: "09:00",
      seats: 2,
      status: "pending"
    },
    {
      id: 2,
      passenger: "Jane Smith",
      from: "Boston",
      to: "New York",
      date: "2024-03-21",
      time: "14:00",
      seats: 1,
      status: "pending"
    }
  ]);

  const [rideHistory, setRideHistory] = useState([
    {
      id: 1,
      passenger: "Alice Johnson",
      from: "New York",
      to: "Boston",
      date: "2024-03-15",
      time: "10:00",
      seats: 2,
      price: 40,
      status: "completed",
      rating: 5
    }
  ]);

  const [driverProfile, setDriverProfile] = useState({
    name: "John Driver",
    email: "john.driver@example.com",
    phone: "+1 234 567 8900",
    car: {
      make: "Toyota",
      model: "Camry",
      year: "2020",
      color: "Silver",
      licensePlate: "ABC123",
      seats: 4,
      image: "/car-image.jpg"
    },
    rating: 4.8,
    totalRides: 156,
    earnings: 2340,
    memberSince: "2023-01-15"
  });

  const handlePostRide = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Ride posted successfully",
        description: "Your ride has been posted and is now visible to passengers."
      });
      setShowPostRide(false);
      setNewRide({
        from: "",
        to: "",
        date: "",
        time: "",
        seats: "",
        price: "",
        notes: ""
      });
    }, 1500);
  };

  const handleAcceptRequest = (requestId) => {
    setRideRequests(prevRequests => 
      prevRequests.filter(request => request.id !== requestId)
    );
    toast({
      title: "Request accepted",
      description: "You have accepted the ride request."
    });
  };

  const handleDeclineRequest = (requestId) => {
    setRideRequests(prevRequests => 
      prevRequests.filter(request => request.id !== requestId)
    );
    toast({
      title: "Request declined",
      description: "You have declined the ride request."
    });
  };

  const handleEditProfile = () => {
    navigate("/driver/profile");
  };

  const handleEditCar = () => {
    navigate("/driver/profile#car");
  };

  const handleLogout = () => {
    // Simulate logout
    setTimeout(() => {
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-8 mt-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Car Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Driver Profile Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Driver Profile</CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleEditProfile}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Your personal information and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Users className="h-10 w-10 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{driverProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{driverProfile.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span>{driverProfile.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {driverProfile.rating}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Rides</span>
                    <span>{driverProfile.totalRides}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Earnings</span>
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {driverProfile.earnings}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Car Information Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Car Information</CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleEditCar}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Your vehicle details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <img 
                    src={driverProfile.car.image} 
                    alt={`${driverProfile.car.make} ${driverProfile.car.model}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Make & Model</span>
                    <span>{driverProfile.car.make} {driverProfile.car.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year</span>
                    <span>{driverProfile.car.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color</span>
                    <span>{driverProfile.car.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License Plate</span>
                    <span>{driverProfile.car.licensePlate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Seats</span>
                    <span>{driverProfile.car.seats}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Logout Button */}
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>

          {/* Middle Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Online Status & Post Ride */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  variant={isOnline ? "default" : "outline"}
                  onClick={() => setIsOnline(!isOnline)}
                >
                  {isOnline ? "Online" : "Offline"}
                </Button>
                <Button onClick={() => setShowPostRide(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Post New Ride
                </Button>
              </div>
              <Button variant="outline" onClick={() => navigate("/driver/settings")}>
                <Settings className="h-4 w-4 mr-2" /> Settings
              </Button>
            </div>

            {/* Post Ride Form */}
            {showPostRide && (
              <Card>
                <CardHeader>
                  <CardTitle>Post New Ride</CardTitle>
                  <CardDescription>Fill in the details of your upcoming ride</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostRide} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="from">From</Label>
                        <Input
                          id="from"
                          placeholder="Starting location"
                          value={newRide.from}
                          onChange={(e) => setNewRide({...newRide, from: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <Input
                          id="to"
                          placeholder="Destination"
                          value={newRide.to}
                          onChange={(e) => setNewRide({...newRide, to: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newRide.date}
                          onChange={(e) => setNewRide({...newRide, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={newRide.time}
                          onChange={(e) => setNewRide({...newRide, time: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="seats">Available Seats</Label>
                        <Input
                          id="seats"
                          type="number"
                          min="1"
                          max={driverProfile.car.seats}
                          value={newRide.seats}
                          onChange={(e) => setNewRide({...newRide, seats: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price per Seat</Label>
                        <Input
                          id="price"
                          type="number"
                          min="1"
                          value={newRide.price}
                          onChange={(e) => setNewRide({...newRide, price: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any specific requirements or information for passengers"
                        value={newRide.notes}
                        onChange={(e) => setNewRide({...newRide, notes: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPostRide(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Post Ride</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Ride Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Ride Requests</CardTitle>
                <CardDescription>Recent requests from passengers</CardDescription>
              </CardHeader>
              <CardContent>
                {rideRequests.length > 0 ? (
                  <div className="space-y-4">
                    {rideRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{request.passenger}</div>
                          <div className="text-sm text-muted-foreground">
                            {request.from} → {request.to}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.date} at {request.time} • {request.seats} seat{request.seats > 1 ? 's' : ''}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No pending ride requests
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Ride History */}
            <Card>
              <CardHeader>
                <CardTitle>Ride History</CardTitle>
                <CardDescription>Your completed rides</CardDescription>
              </CardHeader>
              <CardContent>
                {rideHistory.length > 0 ? (
                  <div className="space-y-4">
                    {rideHistory.map((ride) => (
                      <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{ride.passenger}</div>
                          <div className="text-sm text-muted-foreground">
                            {ride.from} → {ride.to}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {ride.date} at {ride.time} • {ride.seats} seat{ride.seats > 1 ? 's' : ''}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            <DollarSign className="inline-block h-4 w-4 mr-1" />
                            {ride.price}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {ride.rating}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No completed rides yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DriverDashboard; 