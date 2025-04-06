import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Eye, FileText } from "lucide-react";

const RidesPage = () => {
  const [rides, setRides] = useState([
    { 
      id: "RD-5723",
      passenger: "John Smith",
      driver: "Michael Davis",
      pickup: "123 Main St",
      dropoff: "456 Oak Ave",
      date: "2023-07-15",
      time: "14:30",
      status: "Completed",
      fare: "$24.50"
    },
    { 
      id: "RD-5724",
      passenger: "Sarah Johnson",
      driver: "David Thompson",
      pickup: "789 Pine Rd",
      dropoff: "321 Maple Ln",
      date: "2023-07-15",
      time: "16:45",
      status: "Completed",
      fare: "$18.75"
    },
    { 
      id: "RD-5725",
      passenger: "Emily Wilson",
      driver: "Jennifer Lee",
      pickup: "567 Cedar Dr",
      dropoff: "890 Birch St",
      date: "2023-07-16",
      time: "09:15",
      status: "Cancelled",
      fare: "$0.00"
    },
    { 
      id: "RD-5726",
      passenger: "James Anderson",
      driver: "Robert Wilson",
      pickup: "432 Elm St",
      dropoff: "765 Willow Ave",
      date: "2023-07-16",
      time: "11:30",
      status: "In Progress",
      fare: "$21.25"
    },
    { 
      id: "RD-5727",
      passenger: "Lisa Brown",
      driver: "Amanda Martin",
      pickup: "901 Spruce Ln",
      dropoff: "234 Aspen Rd",
      date: "2023-07-16",
      time: "13:45",
      status: "Scheduled",
      fare: "$32.00"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRides = rides.filter(
    (ride) =>
      ride.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.passenger.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ride History</h1>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Rides</CardTitle>
            <CardDescription>View and manage all rides on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search rides..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex ml-2 space-x-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ride ID</TableHead>
                    <TableHead>Passenger</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fare</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRides.length > 0 ? (
                    filteredRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell className="font-medium">{ride.id}</TableCell>
                        <TableCell>{ride.passenger}</TableCell>
                        <TableCell>{ride.driver}</TableCell>
                        <TableCell>{ride.date} at {ride.time}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ride.status === "Completed" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" 
                              : ride.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                                : ride.status === "Scheduled"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                          }`}>
                            {ride.status}
                          </span>
                        </TableCell>
                        <TableCell>{ride.fare}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No rides found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RidesPage;