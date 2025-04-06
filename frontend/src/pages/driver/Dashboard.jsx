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
  LogOut,
  MessageSquare,
  TrendingUp,
  Award,
  Sparkles,
  Filter,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  BarChart,
  History
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ChatDialog from "@/components/Chat/ChatDialog";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  // Chat state
  const [showChat, setShowChat] = useState(false);
  const [chatPassenger, setChatPassenger] = useState(null);
  const [chatRide, setChatRide] = useState(null);

  const [rideRequests, setRideRequests] = useState([
    {
      id: 1,
      passenger: {
        id: "passenger-1",
        name: "John Doe",
        image: "https://randomuser.me/api/portraits/men/41.jpg"
      },
      from: "New York",
      to: "Boston",
      date: "2024-03-20",
      time: "09:00",
      seats: 2,
      status: "pending"
    },
    {
      id: 2,
      passenger: {
        id: "passenger-2",
        name: "Jane Smith",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
      },
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
      passenger: {
        id: "passenger-3",
        name: "Alice Johnson",
        image: "https://randomuser.me/api/portraits/women/33.jpg"
      },
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
    rating: 4.8,
    totalRides: 156,
    earnings: 2340,
    memberSince: "2023-01-15"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

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
      prevRequests.map(request => 
        request.id === requestId 
          ? { ...request, status: "accepted" } 
          : request
      )
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
  
  // Chat handlers
  const openChat = (passenger, ride) => {
    setChatPassenger(passenger);
    setChatRide(ride);
    setShowChat(true);
  };

  const handleEditProfile = () => {
    navigate("/driver/profile");
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
                  <p className="text-sm font-medium opacity-80">Total Earnings</p>
                  <h3 className="text-3xl font-bold mt-1">${driverProfile.earnings}</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +15% this month
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  <DollarSign className="h-8 w-8" />
                </div>
              </div>
              <Progress value={75} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium opacity-80">Total Rides</p>
                  <h3 className="text-3xl font-bold mt-1">{driverProfile.totalRides}</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <Car className="h-4 w-4 mr-1" />
                    Active Driver
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  <Car className="h-8 w-8" />
                </div>
              </div>
              <Progress value={85} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium opacity-80">Rating</p>
                  <h3 className="text-3xl font-bold mt-1">{driverProfile.rating}</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <Star className="h-4 w-4 fill-current" />
                    Top Rated Driver
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              <Progress value={96} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium opacity-80">Active Requests</p>
                  <h3 className="text-3xl font-bold mt-1">{rideRequests.length}</h3>
                  <p className="text-sm mt-2 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Pending Review
                  </p>
                </div>
                <div className="p-3 bg-white/10 rounded-full">
                  <AlertCircle className="h-8 w-8" />
                </div>
              </div>
              <Progress value={40} className="mt-4 bg-white/20" />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Car Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Driver Profile Card */}
            <Card className="border-2 hover:border-primary transition-colors duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Driver Profile
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleEditProfile}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Your personal information and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                    <AvatarFallback>
                      <Users className="h-10 w-10" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{driverProfile.name}</h3>
                    <p className="text-sm text-muted-foreground">{driverProfile.email}</p>
                    <Badge variant="secondary" className="mt-2">
                      Professional Driver
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-accent">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Phone
                    </span>
                    <span className="font-medium">{driverProfile.phone}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-accent">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Rating
                    </span>
                    <span className="font-medium flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                      {driverProfile.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-accent">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <BarChart className="h-4 w-4" />
                      Total Rides
                    </span>
                    <span className="font-medium">{driverProfile.totalRides}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-accent">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Earnings
                    </span>
                    <span className="font-medium">${driverProfile.earnings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Middle Column - Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Online Status & Actions */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant={isOnline ? "default" : "outline"}
                  onClick={() => setIsOnline(!isOnline)}
                  className={`${isOnline ? 'bg-green-500 hover:bg-green-600' : ''} transition-colors duration-300`}
                >
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-gray-400'} mr-2`} />
                  {isOnline ? "Online" : "Offline"}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-primary/90 hover:bg-primary">
                      <Plus className="h-4 w-4 mr-2" /> Post New Ride
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Post New Ride</DialogTitle>
                      <DialogDescription>Fill in the details of your upcoming ride</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePostRide} className="space-y-4 mt-4">
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
                            max={4}
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
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue={activeFilter} onValueChange={setActiveFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter Requests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Requests</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                  </SelectContent>
                </Select>
                    <Button onClick={() => navigate("/driver/settings")} variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
              </div>
            </div>

            {/* Ride Requests */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      Ride Requests
                    </CardTitle>
                    <CardDescription>Recent requests from passengers</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Sort by {sortBy}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("date")}>
                        Date
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("seats")}>
                        Seats
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {rideRequests
                        .filter(request => 
                          activeFilter === "all" || 
                          (activeFilter === "pending" && request.status === "pending") ||
                          (activeFilter === "accepted" && request.status === "accepted")
                        )
                        .map((request) => (
                          <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="group"
                          >
                            <Card className="border hover:border-primary transition-all duration-300">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <Avatar>
                                      <AvatarImage src={request.passenger.image} />
                                      <AvatarFallback>
                                        {request.passenger.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-medium group-hover:text-primary transition-colors">
                                        {request.passenger.name}
                                      </h4>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {request.from} 
                                        <ChevronRight className="h-4 w-4" />
                                        {request.to}
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <Calendar className="h-4 w-4" />
                                        {request.date} at {request.time}
                                        <Users className="h-4 w-4 ml-2" />
                                        {request.seats} seat{request.seats > 1 ? 's' : ''}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    {request.status === "accepted" ? (
                                      <Button
                                        variant="default"
                                        size="sm"
                                        onClick={() => openChat(request.passenger, { id: request.id, type: "ride-request" })}
                                        className="group-hover:bg-primary/90"
                                      >
                                        <MessageSquare className="h-4 w-4 mr-1" />
                                        Chat
                                      </Button>
                                    ) : (
                                      <>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleAcceptRequest(request.id)}
                                          className="group-hover:border-green-500 group-hover:text-green-500"
                                        >
                                          <CheckCircle2 className="h-4 w-4 mr-1" />
                                          Accept
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => handleDeclineRequest(request.id)}
                                          className="group-hover:border-red-500 group-hover:text-red-500"
                                        >
                                          <XCircle className="h-4 w-4 mr-1" />
                                          Decline
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                    {rideRequests.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No pending ride requests</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Ride History */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      Ride History
                    </CardTitle>
                    <CardDescription>Your completed rides</CardDescription>
                  </div>
                  <Select defaultValue="all" onValueChange={(value) => console.log(value)}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {rideHistory.length > 0 ? (
                    <div className="space-y-4">
                      <AnimatePresence>
                        {rideHistory.map((ride) => (
                          <motion.div
                            key={ride.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="group"
                          >
                            <Card className="border hover:border-primary transition-all duration-300">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <Avatar>
                                      <AvatarImage src={ride.passenger.image} />
                                      <AvatarFallback>
                                        {ride.passenger.name.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-medium group-hover:text-primary transition-colors">
                                        {ride.passenger.name}
                                      </h4>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {ride.from} 
                                        <ChevronRight className="h-4 w-4" />
                                        {ride.to}
                                      </div>
                                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <Calendar className="h-4 w-4" />
                                        {ride.date} at {ride.time}
                                        <Users className="h-4 w-4 ml-2" />
                                        {ride.seats} seat{ride.seats > 1 ? 's' : ''}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium text-lg text-primary">
                                      ${ride.price}
                                    </div>
                                    <div className="flex items-center justify-end gap-1 text-sm">
                                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                      <span className="font-medium">{ride.rating}</span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="mt-2 group-hover:text-primary"
                                      onClick={() => openChat(ride.passenger, { id: ride.id, type: "completed-ride" })}
                                    >
                                      <MessageSquare className="h-4 w-4 mr-1" />
                                      Message
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No completed rides yet</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Logout Button */}
            <Button 
              variant="destructive" 
              className="w-full group hover:bg-red-600 transition-colors duration-300" 
              onClick={handleLogout}
            >
              <motion.div
                className="flex items-center justify-center w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Logout
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Chat Dialog */}
      <ChatDialog 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        driver={{ id: "driver-self", name: driverProfile.name, image: "https://randomuser.me/api/portraits/men/32.jpg" }}
        rideDetails={chatRide}
        passengerID={chatPassenger?.id}
      />

      <Footer />
    </div>
  );
};

export default DriverDashboard;
