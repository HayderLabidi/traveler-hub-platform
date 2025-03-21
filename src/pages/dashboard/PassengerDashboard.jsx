import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import NearbyDriversMap from "@/components/NearbyDriversMap";
import PostRideRequestForm from "@/components/PostRideRequestForm";
import { 
  MapPin, 
  Search, 
  Star, 
  Clock, 
  CarFront, 
  MessageSquare, 
  User,
  Calendar,
  Bell,
  Wallet,
  History,
  LogOut,
  Home,
  Map,
  Menu,
  Plus,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";

const PassengerDashboard = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rides, setRides] = useState([
    { id: 1, from: "Home", to: "Work", date: "Today, 9:00 AM", status: "Scheduled" },
    { id: 2, from: "Work", to: "Gym", date: "Today, 5:30 PM", status: "Scheduled" },
    { id: 3, from: "Home", to: "Airport", date: "Tomorrow, 10:00 AM", status: "Scheduled" }
  ]);
  
  const [searchRadius, setSearchRadius] = useState(5); // 5 km default
  const [searchLocation, setSearchLocation] = useState("");
  const [showDriversMap, setShowDriversMap] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("find");
  const [myRequests, setMyRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [viewingRequestDetails, setViewingRequestDetails] = useState(null);
  
  const [nearbyDrivers, setNearbyDrivers] = useState([
    { 
      id: 1, 
      name: "David Johnson", 
      rating: 4.8, 
      location: { lng: -73.985, lat: 40.748 }, 
      distance: "2.1 km",
      vehicle: {
        make: "Tesla",
        model: "Model 3",
        seatsAvailable: 3,
        image: "https://images.unsplash.com/photo-1617704548623-340376564e68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
      },
      price: "$15",
      departureTime: "10:30 AM",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    { 
      id: 2, 
      name: "Sarah Miller", 
      rating: 4.7, 
      location: { lng: -73.978, lat: 40.752 }, 
      distance: "3.4 km",
      vehicle: {
        make: "Honda",
        model: "Civic",
        seatsAvailable: 2,
        image: "https://images.unsplash.com/photo-1590510600147-ae41b578c645?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9uZGElMjBjaXZpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      price: "$12",
      departureTime: "11:15 AM",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    { 
      id: 3, 
      name: "Michael Brown", 
      rating: 4.9, 
      location: { lng: -73.990, lat: 40.745 }, 
      distance: "1.8 km",
      vehicle: {
        make: "Toyota",
        model: "Camry",
        seatsAvailable: 4,
        image: "https://images.unsplash.com/photo-1621007690695-36e0e48f30e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG95b3RhJTIwY2FtcnklMjAyMDIwfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
      },
      price: "$14",
      departureTime: "9:45 AM",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    { 
      id: 4, 
      name: "Jessica Lee", 
      rating: 4.6, 
      location: { lng: -73.982, lat: 40.755 }, 
      distance: "2.5 km",
      vehicle: {
        make: "Ford",
        model: "Escape",
        seatsAvailable: 3,
        image: "https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9yZCUyMGVzY2FwZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      price: "$13",
      departureTime: "10:00 AM",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    { 
      id: 5, 
      name: "Robert Garcia", 
      rating: 4.8, 
      location: { lng: -73.975, lat: 40.760 }, 
      distance: "4.2 km",
      vehicle: {
        make: "Hyundai",
        model: "Sonata",
        seatsAvailable: 2,
        image: "https://images.unsplash.com/photo-1629421889814-adfa53e480f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHl1bmRhaSUyMHNvbmF0YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      price: "$11",
      departureTime: "11:30 AM",
      image: "https://randomuser.me/api/portraits/men/45.jpg" 
    },
    { 
      id: 6, 
      name: "Emma Wilson", 
      rating: 4.9, 
      location: { lng: -73.995, lat: 40.740 }, 
      distance: "3.1 km",
      vehicle: {
        make: "Chevrolet",
        model: "Malibu",
        seatsAvailable: 3,
        image: "https://images.unsplash.com/photo-1638618164682-12b986ec2a75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hldnJvbGV0JTIwbWFsaWJ1fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
      },
      price: "$15",
      departureTime: "9:30 AM",
      image: "https://randomuser.me/api/portraits/women/33.jpg"
    },
  ]);
  
  const [sortOption, setSortOption] = useState("distance");
  const [filterOptions, setFilterOptions] = useState({
    minRating: 4,
    maxPrice: 20,
    minSeats: 1
  });
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New ride offer", message: "Driver Michael is nearby", time: "5 min ago", read: false },
    { id: 2, title: "Ride confirmed", message: "Your ride to Airport is confirmed", time: "1 hour ago", read: false },
    { id: 3, title: "Payment processed", message: "Your payment of $25 was successful", time: "Yesterday", read: true },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleLocationSearch = () => {
    setShowDriversMap(true);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchLocation("Current Location");
          setShowDriversMap(true);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleLogout = () => {
    setTimeout(() => {
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
    }, 1000);
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications",
      description: "All notifications marked as read"
    });
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleRideRequestSuccess = (newRequest, isEditing) => {
    if (isEditing) {
      // Update existing request
      setMyRequests(myRequests.map(req => 
        req.id === newRequest.id ? newRequest : req
      ));
    } else {
      // Add new request
      setMyRequests([newRequest, ...myRequests]);
    }
    
    setEditingRequest(null); // Clear editing state
    setActiveTab("requests"); // Switch to requests tab
  };
  
  const handleEditRequest = (request) => {
    setEditingRequest(request);
    setActiveTab("post");
  };
  
  const handleCancelRequest = (id) => {
    // Show confirmation dialog instead of immediately deleting
    if (confirm("Are you sure you want to cancel this ride request?")) {
      // Set status to cancelled or remove from list
      setMyRequests(myRequests.map(req => 
        req.id === id ? { ...req, status: "Cancelled" } : req
      ));
      
      toast({
        title: "Request cancelled",
        description: "Your ride request has been cancelled."
      });
    }
  };
  
  const handleViewRequestDetails = (request) => {
    setViewingRequestDetails(request);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-8 mt-16 flex-grow pb-24 md:pb-8">
        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50">
          <div className="flex justify-around items-center h-16">
            <Button variant="ghost" size="icon" className="flex flex-col items-center">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" size="icon" className="flex flex-col items-center">
              <Map className="h-5 w-5" />
              <span className="text-xs">Map</span>
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="flex flex-col items-center -mt-6 bg-primary rounded-full h-12 w-12"
              onClick={() => navigate("/book-ride")}
            >
              <CarFront className="h-6 w-6" />
              <span className="text-xs">Book</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="flex flex-col items-center relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
              <span className="text-xs">Alerts</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="flex flex-col items-center">
                  <Menu className="h-5 w-5" />
                  <span className="text-xs">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">John Passenger</h3>
                      <p className="text-sm text-muted-foreground">Premium Member</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <History className="h-4 w-4 mr-2" />
                      My Rides
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Wallet className="h-4 w-4 mr-2" />
                      Payment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">John Passenger</h3>
                    <p className="text-sm text-muted-foreground">Premium Member</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Menu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/book-ride")}
                >
                  <CarFront className="h-4 w-4 mr-2" />
                  Book a Ride
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("post")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post Ride Request
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/passenger/history")}
                >
                  <History className="h-4 w-4 mr-2" />
                  My Rides
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/payment-methods")}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Payment
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/passenger/profile")}
                >
                  <User className="h-4 w-4 mr-2" />
                  My Profile
                </Button>
              </CardContent>
            </Card>

            {/* Logout Button */}
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Section - Hidden on Mobile */}
            <Card className="hidden md:block">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Welcome back, John!</h2>
                    <p className="text-muted-foreground">Ready for your next ride?</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="relative"
                        onClick={() => markAllAsRead()}
                      >
                        <Bell className="h-4 w-4" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </Button>
                      
                      {/* Notifications dropdown */}
                      <div className="absolute right-0 mt-2 w-80 bg-background border border-border rounded-md shadow-lg z-10 hidden group-hover:block">
                        <div className="p-4 border-b border-border">
                          <h4 className="font-medium">Notifications</h4>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {notifications.length > 0 ? (
                            <div className="divide-y divide-border">
                              {notifications.map((notification) => (
                                <div 
                                  key={notification.id} 
                                  className={`p-4 hover:bg-muted cursor-pointer ${notification.read ? 'opacity-70' : 'bg-muted/50'}`}
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <div className="font-medium mb-0.5">{notification.title}</div>
                                  <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="py-8 text-center text-muted-foreground">
                              No notifications
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Total Rides</p>
                      <p className="text-2xl font-bold">25</p>
                    </div>
                    <History className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Upcoming Rides</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">Wallet Balance</p>
                      <p className="text-2xl font-bold">$50.00</p>
                    </div>
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Find Rides / Post Requests / My Requests */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="find">Find Drivers</TabsTrigger>
                <TabsTrigger value="post">Post Request</TabsTrigger>
                <TabsTrigger value="requests">My Requests</TabsTrigger>
              </TabsList>
              
              {/* Find Drivers Tab Content */}
              <TabsContent value="find" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Find Nearby Drivers</CardTitle>
                    <CardDescription>Search for available drivers in your area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="location">Location</Label>
                          <div className="flex mt-1">
                            <Input 
                              id="location" 
                              placeholder="Enter your location" 
                              value={searchLocation}
                              onChange={(e) => setSearchLocation(e.target.value)}
                              className="rounded-r-none"
                            />
                            <Button 
                              variant="outline" 
                              className="rounded-l-none border-l-0"
                              onClick={handleUseCurrentLocation}
                            >
                              <MapPin size={16} />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="radius">Radius (km)</Label>
                          <Input 
                            id="radius" 
                            type="number" 
                            min="1" 
                            max="50" 
                            value={searchRadius}
                            onChange={(e) => setSearchRadius(Number(e.target.value))}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={handleLocationSearch}
                      >
                        <Search className="mr-2" size={16} />
                        Find Drivers
                      </Button>
                      
                      {showDriversMap && (
                        <div className="mt-4">
                          <Tabs defaultValue="grid" className="w-full" onValueChange={(value) => setViewMode(value)}>
                            <div className="flex justify-between items-center mb-4">
                              <TabsList>
                                <TabsTrigger value="grid">Grid View</TabsTrigger>
                                <TabsTrigger value="map">Map View</TabsTrigger>
                              </TabsList>
                            </div>
                            
                            <TabsContent value="grid" className="w-full mt-0">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {nearbyDrivers.map((driver) => (
                                  <Card key={driver.id} className="overflow-hidden card-hover">
                                    <div className="aspect-video relative bg-muted">
                                      {driver.image && (
                                        <img 
                                          src={driver.image} 
                                          alt={driver.name}
                                          className="w-full h-full object-cover"
                                        />
                                      )}
                                      <div className="absolute bottom-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded-md text-sm font-medium">
                                        {driver.price}
                                      </div>
                                    </div>
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h3 className="font-medium text-lg">{driver.name}</h3>
                                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                            <Star size={14} className="text-yellow-500" fill="currentColor" />
                                            <span>{driver.rating}</span>
                                            <span className="mx-1">•</span>
                                            <MapPin size={14} />
                                            <span>{driver.distance}</span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="mt-3 space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                          <CarFront size={14} />
                                          <span>{driver.vehicle?.make} {driver.vehicle?.model}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                          <Clock size={14} />
                                          <span>Departing at {driver.departureTime}</span>
                                        </div>
                                        <div className="text-sm">
                                          {driver.vehicle?.seatsAvailable} seats available
                                        </div>
                                      </div>
                                      
                                      <div className="mt-4 flex gap-2">
                                        <Button 
                                          className="flex-1" 
                                          onClick={() => navigate("/book-ride")}
                                        >
                                          Book Ride
                                        </Button>
                                        <Button 
                                          variant="outline" 
                                          size="icon"
                                          onClick={() => {/* Message driver */}}
                                        >
                                          <MessageSquare size={16} />
                                        </Button>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="map" className="w-full mt-0">
                              <div className="rounded-lg overflow-hidden border border-border">
                                <NearbyDriversMap 
                                  drivers={nearbyDrivers} 
                                  center={{ lng: -73.985, lat: 40.748 }} 
                                  radius={searchRadius}
                                />
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Post Request Tab Content */}
              <TabsContent value="post" className="mt-6">
                <PostRideRequestForm 
                  onSuccess={handleRideRequestSuccess} 
                  editRequest={editingRequest}
                  onCancel={() => {
                    setEditingRequest(null);
                    setActiveTab("requests");
                  }}
                />
              </TabsContent>
              
              {/* My Requests Tab Content */}
              <TabsContent value="requests" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Ride Requests</CardTitle>
                    <CardDescription>Requests you've posted for drivers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {myRequests.length > 0 ? (
                      <div className="space-y-4">
                        {myRequests.map((request) => (
                          <div key={request.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-lg">{request.from} → {request.to}</div>
                                <div className="text-sm text-muted-foreground">{request.date}</div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className={`text-sm px-2 py-1 rounded ${
                                  request.status === 'Active' 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                                    : request.status === 'Cancelled'
                                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                }`}>
                                  {request.status}
                                </span>
                                <span className="text-sm text-muted-foreground mt-1">
                                  {request.responses} {request.responses === 1 ? 'response' : 'responses'}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleViewRequestDetails(request)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                              {request.status === 'Active' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => handleEditRequest(request)}
                                  >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex-1 text-red-500 hover:text-red-700"
                                    onClick={() => handleCancelRequest(request.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Cancel
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">You haven't posted any ride requests yet</p>
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab("post")}
                        >
                          Post your first request
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Request Details Dialog */}
            {viewingRequestDetails && (
              <Dialog open={!!viewingRequestDetails} onOpenChange={(open) => {
                if (!open) setViewingRequestDetails(null);
              }}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Ride Request Details</DialogTitle>
                    <DialogDescription>
                      Full information about your ride request
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-4">
                    <div className="border-b pb-2">
                      <h3 className="font-semibold text-lg">Route</h3>
                      <div className="flex items-center mt-2">
                        <div className="flex flex-col items-center mr-2">
                          <div
