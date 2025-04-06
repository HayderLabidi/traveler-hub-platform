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
import {
  Search,
  Edit,
  Trash2,
  Check,
  X,
  Car,
  UserCheck,
} from "lucide-react";

const DriversPage = () => {
  const [drivers, setDrivers] = useState([
    { 
      id: 1, 
      name: "Michael Davis", 
      email: "michael@example.com", 
      vehicle: "Toyota Camry (2019)", 
      rating: 4.8, 
      trips: 156,
      status: "Active", 
      approved: true,
      pending: false
    },
    { 
      id: 2, 
      name: "David Thompson", 
      email: "david@example.com", 
      vehicle: "Honda Civic (2020)", 
      rating: 4.6, 
      trips: 89,
      status: "Active", 
      approved: true,
      pending: false
    },
    { 
      id: 3, 
      name: "Jennifer Lee", 
      email: "jennifer@example.com", 
      vehicle: "Ford Escape (2021)", 
      rating: 4.9, 
      trips: 203,
      status: "Inactive", 
      approved: true,
      pending: false
    },
    { 
      id: 4, 
      name: "Robert Wilson", 
      email: "robert@example.com", 
      vehicle: "Chevrolet Malibu (2018)", 
      rating: null, 
      trips: 0,
      status: "Pending", 
      approved: false,
      pending: true
    },
    { 
      id: 5, 
      name: "Amanda Martin", 
      email: "amanda@example.com", 
      vehicle: "Hyundai Sonata (2022)", 
      rating: null, 
      trips: 0,
      status: "Pending", 
      approved: false,
      pending: true
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showPending, setShowPending] = useState(false);

  const filteredDrivers = drivers.filter(
    (driver) => {
      const matchesSearch = 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (showPending) {
        return matchesSearch && driver.pending;
      }
      
      return matchesSearch;
    }
  );

  const handleDeleteDriver = (id) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  const handleApproveDriver = (id) => {
    setDrivers(drivers.map(driver => 
      driver.id === id 
        ? {...driver, status: "Active", approved: true, pending: false} 
        : driver
    ));
  };

  const handleRejectDriver = (id) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Manage Drivers</h1>
          <div className="flex space-x-3">
            <Button 
              variant={showPending ? "default" : "outline"}
              onClick={() => setShowPending(!showPending)}
            >
              {showPending ? "All Drivers" : "Pending Approvals"}
              {!showPending && drivers.filter(d => d.pending).length > 0 && (
                <span className="ml-2 bg-primary-foreground text-primary w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {drivers.filter(d => d.pending).length}
                </span>
              )}
            </Button>
            <Button>
              <Car className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {showPending ? "Pending Driver Approvals" : "All Drivers"}
            </CardTitle>
            <CardDescription>
              {showPending 
                ? "Review and approve new driver registrations" 
                : "View and manage all drivers registered on the platform"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search drivers..."
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Trips</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.length > 0 ? (
                    filteredDrivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">{driver.name}</TableCell>
                        <TableCell>{driver.email}</TableCell>
                        <TableCell>{driver.vehicle}</TableCell>
                        <TableCell>{driver.rating ? driver.rating : "-"}</TableCell>
                        <TableCell>{driver.trips}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            driver.status === "Active" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" 
                              : driver.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
                          }`}>
                            {driver.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          {driver.pending ? (
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleApproveDriver(driver.id)}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleRejectDriver(driver.id)}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <X className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteDriver(driver.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        {showPending 
                          ? "No pending driver applications." 
                          : "No drivers found matching your search."}
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

export default DriversPage;