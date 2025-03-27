import { useState, useEffect } from "react";
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
import ChatDialog from "@/components/Chat/ChatDialog";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Info,
  X,
  TrendingUp,
  Leaf,
  DollarSign,
  Award,
  Sparkles,
  Filter
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Slider
} from "@/components/ui/slider";

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
  
  // Chat and details state
  const [showChat, setShowChat] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedRideDetails, setSelectedRideDetails] = useState(null);
  const [showRideDetails, setShowRideDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
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
        image: "https://images.unsplash.com/photo-1629421889814-adfa53e480f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aHl1bmRhaIUyMHNvbmF0YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    rating: 0,
    price: 100,
    seats: 1
  });

  const handleLocationSearch = () => {
    setIsLoading(true);
    setShowDriversMap(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
  
  // Chat handlers
  const openChat = (driver, rideDetails) => {
    setSelectedDriver(driver);
    setSelectedRideDetails(rideDetails);
    setShowChat(true);
  };
  
  const closeChat = () => {
    setShowChat(false);
  };
  
  // View request details
  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setShowRideDetails(true);
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

  const handleRideRequestSuccess = (newRequest) => {
    setMyRequests([newRequest, ...myRequests]);
    setActiveTab("requests");
  };
  
  // Handle cancellation of a request
  const handleCancelRequest = (requestId) => {
    setMyRequests(myRequests.map(request => 
      request.id === requestId ? { ...request, status: "cancelled" } : request
    ));
    
    toast({
      title: "Request cancelled",
      description: "Your ride request has been cancelled successfully."
    });
    
    setShowRideDetails(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-8 mt-16">
        {/* Hero Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium opacity-80">Total Rides</p>
                  <h3 className="text-3xl font-bold mt-1">25</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12% this month
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  <CarFront className="h-8 w-8" />
                </div>
              </div>
              <Progress value={75} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium opacity-80">CO₂ Saved</p>
                  <h3 className="text-3xl font-bold mt-1">127kg</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <Leaf className="h-4 w-4 mr-1" />
                    Eco-friendly rider
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  <Leaf className="h-8 w-8" />
                </div>
              </div>
              <Progress value={60} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium opacity-80">Money Saved</p>
                  <h3 className="text-3xl font-bold mt-1">$342</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    15% vs. taxi rides
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  <Wallet className="h-8 w-8" />
                </div>
              </div>
              <Progress value={85} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium opacity-80">Rating</p>
                  <h3 className="text-3xl font-bold mt-1">4.9</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    Top Passenger
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              <Progress value={98} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group"
                  onClick={() => navigate("/book-ride")}
                >
                  <CarFront className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>Book a Ride</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group"
                  onClick={() => setActiveTab("post")}
                >
                  <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>Post Request</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group"
                  onClick={() => navigate("/passenger/history")}
                >
                  <History className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>My Rides</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all group"
                  onClick={() => navigate("/payment-methods")}
                >
                  <Wallet className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  <span>Payment</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="find" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Search className="h-4 w-4 mr-2" />
                Find Drivers
              </TabsTrigger>
              <TabsTrigger value="post" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Plus className="h-4 w-4 mr-2" />
                Post Request
              </TabsTrigger>
              <TabsTrigger value="requests" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Clock className="h-4 w-4 mr-2" />
                My Requests
              </TabsTrigger>
            </TabsList>

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
                            
                            <div className="flex items-center gap-4">
                              <Select onValueChange={(value) => setSortOption(value)} defaultValue={sortOption}>
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="distance">Distance</SelectItem>
                                  <SelectItem value="rating">Rating</SelectItem>
                                  <SelectItem value="price">Price</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 p-4">
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Minimum Rating</Label>
                                      <Slider
                                        defaultValue={[selectedFilters.rating]}
                                        max={5}
                                        step={0.5}
                                        onValueChange={([value]) => 
                                          setSelectedFilters(prev => ({ ...prev, rating: value }))
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label>Maximum Price ($)</Label>
                                      <Slider
                                        defaultValue={[selectedFilters.price]}
                                        max={100}
                                        step={5}
                                        onValueChange={([value]) => 
                                          setSelectedFilters(prev => ({ ...prev, price: value }))
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label>Minimum Seats</Label>
                                      <Slider
                                        defaultValue={[selectedFilters.seats]}
                                        max={7}
                                        step={1}
                                        onValueChange={([value]) => 
                                          setSelectedFilters(prev => ({ ...prev, seats: value }))
                                        }
                                      />
                                    </div>
                                  </div>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <TabsContent value="grid" className="w-full mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {isLoading ? (
                                Array(6).fill(0).map((_, index) => (
                                  <Card key={index} className="overflow-hidden">
                                    <div className="aspect-video">
                                      <Skeleton className="w-full h-full" />
                                    </div>
                                    <CardContent className="p-4">
                                      <div className="space-y-3">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <div className="space-y-2">
                                          <Skeleton className="h-4 w-full" />
                                          <Skeleton className="h-4 w-full" />
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))
                              ) : (
                                nearbyDrivers
                                  .filter(driver => 
                                    driver.rating >= selectedFilters.rating &&
                                    parseFloat(driver.price.replace('$', '')) <= selectedFilters.price &&
                                    driver.vehicle.seatsAvailable >= selectedFilters.seats
                                  )
                                  .sort((a, b) => {
                                    switch (sortOption) {
                                      case 'distance':
                                        return parseFloat(a.distance) - parseFloat(b.distance);
                                      case 'rating':
                                        return b.rating - a.rating;
                                      case 'price':
                                        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
                                      default:
                                        return 0;
                                    }
                                  })
                                  .map((driver) => (
                                    <motion.div
                                      key={driver.id}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                                        <div className="aspect-video relative bg-muted group-hover:scale-105 transition-transform duration-300">
                                          {driver.image && (
                                            <img 
                                              src={driver.image} 
                                              alt={driver.name}
                                              className="w-full h-full object-cover"
                                            />
                                          )}
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                          <div className="absolute bottom-2 right-2 bg-background/90 text-foreground px-3 py-1 rounded-full text-sm font-medium">
                                            {driver.price}
                                          </div>
                                          <Badge 
                                            className="absolute top-2 left-2" 
                                            variant={driver.rating >= 4.8 ? "default" : "secondary"}
                                          >
                                            <Star size={12} className="mr-1" fill="currentColor" />
                                            {driver.rating}
                                          </Badge>
                                        </div>
                                        <CardContent className="p-4">
                                          <div className="flex justify-between items-start">
                                            <div>
                                              <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                                                {driver.name}
                                              </h3>
                                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                                            <div className="flex items-center gap-2 text-sm">
                                              <User size={14} />
                                              <span>{driver.vehicle?.seatsAvailable} seats available</span>
                                            </div>
                                          </div>
                                          
                                          <div className="mt-4 flex gap-2">
                                            <Button 
                                              className="flex-1 group-hover:bg-primary/90"
                                              onClick={() => navigate("/book-ride")}
                                            >
                                              Book Ride
                                            </Button>
                                            <Button 
                                              variant="outline" 
                                              size="icon"
                                              className="group-hover:border-primary group-hover:text-primary"
                                              onClick={() => openChat(driver, { id: `ride-${driver.id}`, type: "direct-booking" })}
                                            >
                                              <MessageSquare size={16} />
                                            </Button>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </motion.div>
                                  ))
                              )}
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
            
            <TabsContent value="post" className="mt-6">
              <PostRideRequestForm onSuccess={handleRideRequestSuccess} />
            </TabsContent>
            
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
                              <div className="font-medium">{request.from} → {request.to}</div>
                              <div className="text-sm text-muted-foreground">{request.date}</div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className={`text-sm px-2 py-1 rounded ${
                                request.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                                request.status === 'accepted' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                                request.status === 'cancelled' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                                'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                              }`}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                              {request.responses > 0 && (
                                <span className="text-sm text-muted-foreground mt-1">
                                  {request.responses} {request.responses === 1 ? 'response' : 'responses'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            {request.status === 'accepted' && (
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => openChat({ 
                                  id: request.driverId || 'driver-1', 
                                  name: request.driverName || 'Your Driver',
                                  image: request.driverImage || "https://randomuser.me/api/portraits/men/32.jpg"
                                }, { id: request.id, type: "ride-request" })}
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Chat with Driver
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => viewRequestDetails(request)}
                            >
                              <Info className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            {request.status === 'pending' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 text-red-500 hover:text-red-700"
                                onClick={() => handleCancelRequest(request.id)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
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
        </motion.div>
      </main>

      <Footer />

      {/* Chat Dialog */}
      <AnimatePresence>
        {showChat && selectedDriver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <ChatDialog
              driver={selectedDriver}
              onClose={() => {
                setShowChat(false);
                setSelectedDriver(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PassengerDashboard;
