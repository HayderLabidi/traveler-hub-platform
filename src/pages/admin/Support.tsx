
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
import { Search, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

const SupportPage = () => {
  const [tickets, setTickets] = useState([
    { 
      id: "TKT-1001",
      user: "John Smith",
      userType: "Passenger",
      subject: "Refund for canceled ride",
      priority: "Medium",
      status: "Open",
      created: "2023-07-15",
      lastUpdated: "2023-07-15"
    },
    { 
      id: "TKT-1002",
      user: "Michael Davis",
      userType: "Driver",
      subject: "Payment not received",
      priority: "High",
      status: "Open",
      created: "2023-07-14",
      lastUpdated: "2023-07-16"
    },
    { 
      id: "TKT-1003",
      user: "Sarah Johnson",
      userType: "Passenger",
      subject: "App crash during ride",
      priority: "Low",
      status: "Open",
      created: "2023-07-16",
      lastUpdated: "2023-07-16"
    },
    { 
      id: "TKT-1004",
      user: "David Thompson",
      userType: "Driver",
      subject: "Account verification issue",
      priority: "Medium",
      status: "Closed",
      created: "2023-07-10",
      lastUpdated: "2023-07-13"
    },
    { 
      id: "TKT-1005",
      user: "Emily Wilson",
      userType: "Passenger",
      subject: "Driver behavior complaint",
      priority: "High",
      status: "Closed",
      created: "2023-07-08",
      lastUpdated: "2023-07-11"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = tickets.filter(
    (ticket) => {
      const matchesSearch = 
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (statusFilter === "all") {
        return matchesSearch;
      } else if (statusFilter === "open") {
        return matchesSearch && ticket.status === "Open";
      } else {
        return matchesSearch && ticket.status === "Closed";
      }
    }
  );

  const openTicketsCount = tickets.filter(ticket => ticket.status === "Open").length;
  const highPriorityCount = tickets.filter(ticket => ticket.priority === "High" && ticket.status === "Open").length;

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Support Tickets</h1>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Announcement
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Tickets</p>
                  <p className="text-2xl font-bold">{openTicketsCount}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold">{highPriorityCount}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                  <p className="text-2xl font-bold">1.8 hours</p>
                </div>
                <CheckCircle className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Manage and respond to user support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tickets..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex ml-2 space-x-2">
                <Button 
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === "open" ? "default" : "outline"}
                  onClick={() => setStatusFilter("open")}
                >
                  Open
                </Button>
                <Button 
                  variant={statusFilter === "closed" ? "default" : "outline"}
                  onClick={() => setStatusFilter("closed")}
                >
                  Closed
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          {ticket.user}
                          <span className="ml-2 text-xs text-muted-foreground">({ticket.userType})</span>
                        </TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ticket.priority === "High" 
                              ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300" 
                              : ticket.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                          }`}>
                            {ticket.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            ticket.status === "Open" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" 
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
                          }`}>
                            {ticket.status}
                          </span>
                        </TableCell>
                        <TableCell>{ticket.lastUpdated}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Respond
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No tickets found matching your search.
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

export default SupportPage;
