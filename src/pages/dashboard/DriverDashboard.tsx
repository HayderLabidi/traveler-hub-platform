import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { Check, Clock, X } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const DriverDashboard = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, passenger: "Alice Smith", pickup: "123 Main St", dropoff: "456 Park Ave", distance: "3.2 miles", earnings: "$12.50" },
    { id: 2, passenger: "Bob Johnson", pickup: "789 Oak Dr", dropoff: "321 Pine Rd", distance: "5.7 miles", earnings: "$18.75" }
  ]);
  
  const [rideHistory, setRideHistory] = useState([
    { id: 101, passenger: "Carol Davis", date: "Yesterday", earnings: "$15.25", distance: "4.1 miles" },
    { id: 102, passenger: "Dave Wilson", date: "2 days ago", earnings: "$23.50", distance: "7.3 miles" },
    { id: 103, passenger: "Eve Brown", date: "3 days ago", earnings: "$9.75", distance: "2.8 miles" }
  ]);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-8 mt-16 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Driver Status</CardTitle>
                <CardDescription>
                  You are currently {isOnline ? "online" : "offline"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className={`w-full ${isOnline ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                  onClick={toggleOnlineStatus}
                >
                  {isOnline ? "Go Offline" : "Go Online"}
                </Button>
              </CardContent>
            </Card>
            
            {isOnline && (
              <Card>
                <CardHeader>
                  <CardTitle>Ride Requests</CardTitle>
                  <CardDescription>Available ride requests in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  {requests.length > 0 ? (
                    <div className="space-y-4">
                      {requests.map((request) => (
                        <div key={request.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{request.passenger}</div>
                            <div className="font-medium text-green-600">{request.earnings}</div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            <div>Pickup: {request.pickup}</div>
                            <div>Dropoff: {request.dropoff}</div>
                            <div>Distance: {request.distance}</div>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Button className="flex-1" size="sm">
                              <Check className="mr-1 h-4 w-4" /> Accept
                            </Button>
                            <Button variant="outline" className="flex-1" size="sm">
                              <X className="mr-1 h-4 w-4" /> Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No requests at the moment</p>
                      <p className="text-sm text-muted-foreground">Waiting for ride requests...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Ride History</CardTitle>
                <CardDescription>Your recent rides</CardDescription>
              </CardHeader>
              <CardContent>
                {rideHistory.length > 0 ? (
                  <div className="space-y-3">
                    {rideHistory.map((ride) => (
                      <div key={ride.id} className="border rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{ride.passenger}</div>
                          <div className="text-sm text-muted-foreground">{ride.date} • {ride.distance}</div>
                        </div>
                        <div className="font-medium text-green-600">{ride.earnings}</div>
                      </div>
                    ))}
                    <Button variant="link" className="w-full mt-2">
                      View Complete History
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No ride history</p>
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
                  <div className="font-medium">James Smith</div>
                  <div className="text-sm text-muted-foreground">james.smith@example.com</div>
                  <div className="text-sm text-muted-foreground">Vehicle: Sedan</div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Today</span>
                    <span className="font-medium">$42.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Week</span>
                    <span className="font-medium">$325.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-medium">$1,245.80</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    View Earnings Details
                  </Button>
                </div>
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
