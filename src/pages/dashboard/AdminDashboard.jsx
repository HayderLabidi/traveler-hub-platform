import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Car, 
  Route, 
  CreditCard, 
  HelpCircle, 
  Settings, 
  LogOut,
  UserPlus,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Shield,
  ShieldCheck,
  MessageSquare,
  Activity
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalDrivers: 450,
    activeRides: 85,
    totalRevenue: 125000,
    pendingApprovals: 12,
    supportTickets: 8
  });

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

  // Mock data - replace with actual API calls
  const mockStats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Total Drivers",
      value: "456",
      change: "+8%",
      icon: Car,
      color: "text-green-500",
    },
    {
      title: "Active Rides",
      value: "89",
      change: "+5%",
      icon: Activity,
      color: "text-purple-500",
    },
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+15%",
      icon: DollarSign,
      color: "text-yellow-500",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "-2%",
      icon: ShieldCheck,
      color: "text-orange-500",
    },
    {
      title: "Support Tickets",
      value: "45",
      change: "+3%",
      icon: MessageSquare,
      color: "text-red-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "ride",
      description: "New ride request from John Doe",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      id: 2,
      type: "verification",
      description: "Driver verification approved for Jane Smith",
      time: "1 hour ago",
      status: "completed",
    },
    {
      id: 3,
      type: "payment",
      description: "Payment processed for ride #1234",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 4,
      type: "support",
      description: "New support ticket from Mike Johnson",
      time: "3 hours ago",
      status: "pending",
    },
    {
      id: 5,
      type: "user",
      description: "New user registration: Sarah Wilson",
      time: "4 hours ago",
      status: "completed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your platform's performance and recent activities
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions and events in your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.description}</TableCell>
                      <TableCell>{activity.time}</TableCell>
                      <TableCell>
                        <span className={getStatusColor(activity.status)}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 