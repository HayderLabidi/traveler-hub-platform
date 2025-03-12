
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Calendar, Clock, User, DollarSign, Star, MapPin, ArrowRight, Car, Users, Bell } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const earningsData = [
  { name: "Mon", amount: 65 },
  { name: "Tue", amount: 85 },
  { name: "Wed", amount: 45 },
  { name: "Thu", amount: 120 },
  { name: "Fri", amount: 145 },
  { name: "Sat", amount: 180 },
  { name: "Sun", amount: 95 },
];

const ridesData = [
  { name: "Mon", rides: 4 },
  { name: "Tue", rides: 5 },
  { name: "Wed", rides: 3 },
  { name: "Thu", rides: 7 },
  { name: "Fri", rides: 8 },
  { name: "Sat", rides: 10 },
  { name: "Sun", rides: 6 },
];

const upcomingRides = [
  {
    id: 1,
    passenger: "Emma Wilson",
    from: "Downtown San Francisco",
    to: "San Jose",
    date: "May 30, 2023",
    time: "09:30 AM",
    estimatedEarnings: "$24.50",
    status: "confirmed",
  },
  {
    id: 2,
    passenger: "Michael Chen",
    from: "Palo Alto",
    to: "San Francisco Airport",
    date: "Jun 2, 2023",
    time: "07:15 AM",
    estimatedEarnings: "$35.00",
    status: "pending",
  },
];

const rideRequests = [
  {
    id: 1,
    passenger: "Alex Johnson",
    rating: 4.8,
    from: "Berkeley",
    to: "Oakland",
    date: "May 29, 2023",
    time: "11:45 AM",
    estimatedEarnings: "$18.25",
  },
  {
    id: 2,
    passenger: "Sophia Garcia",
    rating: 4.9,
    from: "San Francisco",
    to: "Daly City",
    date: "May 29, 2023",
    time: "03:30 PM",
    estimatedEarnings: "$15.75",
  },
];

const DriverDashboard = () => {
  return (
    <DashboardLayout userType="driver">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Driver Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, David! Manage your rides and earnings.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <Toggle aria-label="Toggle availability">
              <Car className="mr-2 h-4 w-4" />
              Available for rides
            </Toggle>
            <Button>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
              <Badge className="ml-2 bg-brand-500" variant="secondary">3</Badge>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Today's Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$85.50</div>
              <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Rides Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">43</div>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">4.9</div>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Out of 5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$735.25</div>
              <p className="text-xs text-muted-foreground mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Earnings</CardTitle>
              <CardDescription>Your earnings for the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={earningsData}
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
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Earnings']}
                    />
                    <Bar dataKey="amount" fill="#22C55E" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ride Statistics</CardTitle>
              <CardDescription>Number of rides per day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ridesData}
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
                    <Line type="monotone" dataKey="rides" stroke="#0EA5E9" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ride Management Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Ride Management</CardTitle>
            <CardDescription>Manage your upcoming rides and requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming">
              <TabsList className="w-full">
                <TabsTrigger value="upcoming" className="flex-1">Upcoming Rides</TabsTrigger>
                <TabsTrigger value="requests" className="flex-1">Ride Requests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="pt-4">
                {upcomingRides.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingRides.map((ride) => (
                      <div key={ride.id} className="flex flex-col md:flex-row justify-between p-4 rounded-lg border">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{ride.passenger}</div>
                              <Badge variant={ride.status === "confirmed" ? "default" : "secondary"} className="mt-1">
                                {ride.status === "confirmed" ? "Confirmed" : "Pending"}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="mt-3 md:mt-0">
                            <div className="flex items-start space-x-1">
                              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{ride.from}</div>
                                <div className="flex items-center">
                                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                  <div className="font-medium ml-1">{ride.to}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 md:mt-0 flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>{ride.date}</span>
                            <Clock className="ml-3 mr-1 h-4 w-4" />
                            <span>{ride.time}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 md:mt-0 text-right">
                          <div className="font-medium text-green-600">{ride.estimatedEarnings}</div>
                          <div className="text-sm text-muted-foreground">Estimated earnings</div>
                          <div className="mt-2 space-x-2">
                            <Button variant="outline" size="sm">Contact</Button>
                            <Button size="sm">Navigate</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">You don't have any upcoming rides</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="requests" className="pt-4">
                {rideRequests.length > 0 ? (
                  <div className="space-y-4">
                    {rideRequests.map((request) => (
                      <div key={request.id} className="flex flex-col md:flex-row justify-between p-4 rounded-lg border">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{request.passenger}</div>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 text-sm">{request.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 md:mt-0">
                            <div className="flex items-start space-x-1">
                              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{request.from}</div>
                                <div className="flex items-center">
                                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                  <div className="font-medium ml-1">{request.to}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 md:mt-0 flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>{request.date}</span>
                            <Clock className="ml-3 mr-1 h-4 w-4" />
                            <span>{request.time}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 md:mt-0 text-right">
                          <div className="font-medium text-green-600">{request.estimatedEarnings}</div>
                          <div className="text-sm text-muted-foreground">Estimated earnings</div>
                          <div className="mt-2 space-x-2">
                            <Button variant="outline" size="sm">Decline</Button>
                            <Button size="sm">Accept</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">You don't have any ride requests</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex flex-col py-4">
                <Car className="h-5 w-5 mb-2" />
                <span>Add Vehicle</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col py-4">
                <Calendar className="h-5 w-5 mb-2" />
                <span>Set Schedule</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col py-4">
                <DollarSign className="h-5 w-5 mb-2" />
                <span>Earnings Report</span>
              </Button>
              <Button variant="outline" className="h-auto flex flex-col py-4">
                <Users className="h-5 w-5 mb-2" />
                <span>Invite Friends</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;
