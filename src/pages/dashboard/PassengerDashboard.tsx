
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PassengerDashboard = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [rides, setRides] = useState([
    { id: 1, from: "Home", to: "Work", date: "Today, 9:00 AM", status: "Scheduled" },
    { id: 2, from: "Work", to: "Gym", date: "Today, 5:30 PM", status: "Scheduled" },
    { id: 3, from: "Home", to: "Airport", date: "Tomorrow, 10:00 AM", status: "Scheduled" }
  ]);

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
                    <Button className="w-full">Book Now</Button>
                    <Button variant="outline" className="w-full">Schedule</Button>
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
                    <Button variant="link">Book your first ride</Button>
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
                  <Button variant="outline" size="sm" className="w-full mt-4">
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
                <Button variant="outline" size="sm" className="w-full">
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
