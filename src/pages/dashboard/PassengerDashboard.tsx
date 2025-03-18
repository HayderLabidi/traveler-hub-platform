
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
import { MapPin, Search } from "lucide-react";

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
  
  // Mock data for nearby drivers
  const [nearbyDrivers, setNearbyDrivers] = useState([
    { id: 1, name: "David Johnson", rating: 4.8, location: { lng: -73.985, lat: 40.748 }, distance: "2.1 km" },
    { id: 2, name: "Sarah Miller", rating: 4.7, location: { lng: -73.978, lat: 40.752 }, distance: "3.4 km" },
    { id: 3, name: "Michael Brown", rating: 4.9, location: { lng: -73.990, lat: 40.745 }, distance: "1.8 km" },
  ]);
  
  const handleLocationSearch = () => {
    // In a real app, this would call an API to find nearby drivers
    // For demo purposes, we'll just show the map with mock data
    setShowDriversMap(true);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Here you would call your backend API with these coordinates
          // For demo purposes, we'll just set a placeholder and show the map
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
          <div className="md:col-span-2 space-y-6">
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
                      <div className="rounded-lg overflow-hidden border border-border mb-4">
                        <NearbyDriversMap 
                          drivers={nearbyDrivers} 
                          center={{ lng: -73.985, lat: 40.748 }} 
                          radius={searchRadius}
                        />
                      </div>
                      
                      <div className="space-y-3 mt-3">
                        <h3 className="text-sm font-medium">Available Drivers ({nearbyDrivers.length})</h3>
                        {nearbyDrivers.map((driver) => (
                          <div key={driver.id} className="flex justify-between items-center p-3 rounded-lg border border-border">
                            <div>
                              <p className="font-medium">{driver.name}</p>
                              <p className="text-sm text-muted-foreground">⭐ {driver.rating} • {driver.distance}</p>
                            </div>
                            <Button size="sm" onClick={() => navigate("/book-ride")}>
                              Book
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">john.doe@example.com</div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate("/payment-methods")}
                >
                  Add Payment Method
                </Button>
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
