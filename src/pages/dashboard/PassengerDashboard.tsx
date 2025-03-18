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
import { MapPin, Search, Filter, Star, Clock, ChevronDown, CarFront, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Driver {
  id: number;
  name: string;
  rating: number;
  location: {
    lng: number;
    lat: number;
  };
  distance: string;
  vehicle?: {
    make?: string;
    model?: string;
    year?: string;
    color?: string;
    image?: string;
    seatsAvailable?: number;
  };
  price?: string;
  departureTime?: string;
  image?: string;
}

const PassengerDashboard = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [rides, setRides] = useState([
    { id: 1, from: "Home", to: "Work", date: "Today, 9:00 AM", status: "Scheduled" },
    { id: 2, from: "Work", to: "Gym", date: "Today, 5:30 PM", status: "Scheduled" },
    { id: 3, from: "Home", to: "Airport", date: "Tomorrow, 10:00 AM", status: "Scheduled" }
  ]);
  
  const [searchRadius, setSearchRadius] = useState(5); // 5 km default
  const [searchLocation, setSearchLocation] = useState("");
  const [showDriversMap, setShowDriversMap] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  
  const [nearbyDrivers, setNearbyDrivers] = useState<Driver[]>([
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-8 mt-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3 space-y-6">
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
                      <Tabs defaultValue="grid" className="w-full" onValueChange={(value) => setViewMode(value as "grid" | "map")}>
                        <div className="flex justify-between items-center mb-4">
                          <TabsList>
                            <TabsTrigger value="grid">Grid View</TabsTrigger>
                            <TabsTrigger value="map">Map View</TabsTrigger>
                          </TabsList>
                          
                          <div className="flex items-center gap-2">
                            <Label htmlFor="sort" className="text-sm">Sort by:</Label>
                            <select 
                              id="sort" 
                              className="text-sm border rounded-md p-1"
                              value={sortOption}
                              onChange={(e) => setSortOption(e.target.value)}
                            >
                              <option value="distance">Distance</option>
                              <option value="rating">Rating</option>
                              <option value="price">Price</option>
                            </select>
                            
                            <Button variant="outline" size="sm" className="ml-2">
                              <Filter size={14} className="mr-1" />
                              Filters
                            </Button>
                          </div>
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
                          
                          <Pagination className="mt-6">
                            <PaginationContent>
                              <PaginationItem>
                                <PaginationPrevious href="#" />
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink href="#" isActive>1</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationNext href="#" />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </TabsContent>
                        
                        <TabsContent value="map" className="w-full mt-0">
                          <div className="rounded-lg overflow-hidden border border-border">
                            <NearbyDriversMap 
                              drivers={nearbyDrivers} 
                              center={{ lng: -73.985, lat: 40.748 }} 
                              radius={searchRadius}
                            />
                          </div>
                          
                          <div className="mt-4 space-y-3 border border-border rounded-lg p-4">
                            <h3 className="text-sm font-medium">Available Drivers ({nearbyDrivers.length})</h3>
                            <div className="max-h-[300px] overflow-y-auto space-y-2">
                              {nearbyDrivers.map((driver) => (
                                <div key={driver.id} className="flex items-center p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                    {driver.image && (
                                      <img 
                                        src={driver.image} 
                                        alt={driver.name}
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{driver.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      <Star size={12} className="inline text-yellow-500" fill="currentColor" /> 
                                      {driver.rating} • {driver.distance} • {driver.price}
                                    </p>
                                  </div>
                                  <Button size="sm" onClick={() => navigate("/book-ride")}>
                                    Book
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Book a Ride</CardTitle>
                <CardDescription>Where would you like to go today?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="w-full" onClick={() => navigate("/book-ride")}>Book Now</Button>
                    <Button variant="outline" className="w-full" onClick={() => {
                      navigate("/book-ride");
                      // This would pre-select the schedule tab on the booking page
                    }}>Schedule</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Rides</CardTitle>
                <CardDescription>Your scheduled trips</CardDescription>
              </CardHeader>
              <CardContent>
                {rides.length > 0 ? (
                  <div className="space-y-4">
                    {rides.map((ride) => (
                      <div key={ride.id} className="border rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{ride.from} → {ride.to}</div>
                          <div className="text-sm text-muted-foreground">{ride.date}</div>
                        </div>
                        <div>
                          <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            {ride.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming rides</p>
                    <Button variant="link" onClick={() => navigate("/book-ride")}>Book your first ride</Button>
                  </div>
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

export default PassengerDashboard;
