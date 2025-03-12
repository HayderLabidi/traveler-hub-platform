
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Clock, ArrowRight, Search, Bookmark, RotateCcw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const activityData = [
  { name: "Mon", rides: 4 },
  { name: "Tue", rides: 3 },
  { name: "Wed", rides: 2 },
  { name: "Thu", rides: 6 },
  { name: "Fri", rides: 8 },
  { name: "Sat", rides: 5 },
  { name: "Sun", rides: 4 },
];

const upcomingRides = [
  {
    id: 1,
    from: "Downtown San Francisco",
    to: "San Jose",
    date: "May 30, 2023",
    time: "09:30 AM",
    driver: "Michael E.",
    price: "$24.50",
  },
  {
    id: 2,
    from: "Palo Alto",
    to: "San Francisco Airport",
    date: "Jun 2, 2023",
    time: "07:15 AM",
    driver: "Sarah T.",
    price: "$35.00",
  },
];

const recentRides = [
  {
    id: 1,
    from: "Oakland",
    to: "San Francisco",
    date: "May 25, 2023",
    driver: "Rachel K.",
    price: "$22.75",
    status: "completed",
  },
  {
    id: 2,
    from: "San Francisco",
    to: "Mountain View",
    date: "May 23, 2023",
    driver: "Kevin L.",
    price: "$28.50",
    status: "completed",
  },
  {
    id: 3,
    from: "San Jose",
    to: "Santa Clara",
    date: "May 20, 2023",
    driver: "Amanda W.",
    price: "$15.25",
    status: "completed",
  },
];

const PassengerDashboard = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  return (
    <DashboardLayout userType="passenger">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Passenger Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John! Find your next ride.</p>
          </div>
        </div>

        {/* Search box */}
        <Card>
          <CardHeader>
            <CardTitle>Find a Ride</CardTitle>
            <CardDescription>Enter your locations to find available rides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>From</span>
                </div>
                <Input 
                  placeholder="Enter pickup location" 
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span>To</span>
                </div>
                <Input 
                  placeholder="Enter destination" 
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span>When</span>
                </div>
                <div className="flex space-x-2">
                  <Input type="date" className="flex-1" />
                  <Button type="submit" disabled={!fromLocation || !toLocation}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Activity card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
              <CardDescription>Ride statistics for the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={activityData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="rides" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Saved Places */}
          <Card>
            <CardHeader>
              <CardTitle>Saved Places</CardTitle>
              <CardDescription>Quickly access your favorite locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Work</span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Gym</span>
                </Button>
                <Button variant="ghost" className="w-full">
                  <Bookmark className="mr-2 h-4 w-4" />
                  <span>Save new place</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Rides */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Rides</CardTitle>
            <CardDescription>Your scheduled rides</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingRides.length > 0 ? (
              <div className="space-y-4">
                {upcomingRides.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                      <div className="flex flex-col">
                        <div className="font-medium">{ride.from}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <ArrowRight className="mx-1 h-3 w-3" />
                        </div>
                        <div className="font-medium">{ride.to}</div>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{ride.date}</span>
                        <Clock className="ml-3 mr-1 h-4 w-4" />
                        <span>{ride.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{ride.price}</div>
                      <div className="text-sm">Driver: {ride.driver}</div>
                      <Button variant="outline" size="sm" className="mt-2">
                        View details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">You don't have any upcoming rides</p>
                <Button className="mt-4">Find a ride</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Rides */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Rides</CardTitle>
              <CardDescription>Your ride history</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <RotateCcw className="mr-2 h-4 w-4" />
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRides.map((ride) => (
                <div key={ride.id} className="flex justify-between items-center p-4 rounded-lg border">
                  <div>
                    <div className="font-medium">
                      {ride.from} to {ride.to}
                    </div>
                    <div className="text-sm text-muted-foreground">{ride.date}</div>
                    <div className="text-sm">Driver: {ride.driver}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{ride.price}</div>
                    <div className="text-sm capitalize text-green-600">{ride.status}</div>
                    <Button variant="ghost" size="sm">
                      Receipt
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PassengerDashboard;
