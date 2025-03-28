import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
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
  Activity,
  ChevronRight,
  Calendar,
  Bell,
  Search,
  Filter
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

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
    supportTickets: 8,
    monthlyGrowth: 15,
    weeklyGrowth: 8
  });

  const handleLogout = () => {
    setTimeout(() => {
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
    }, 1000);
  };

  // Platform statistics
  const mockStats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Drivers",
      value: "456",
      change: "+8%",
      icon: Car,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Active Rides",
      value: "89",
      change: "+5%",
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+15%",
      icon: DollarSign,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "-2%",
      icon: ShieldCheck,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Support Tickets",
      value: "45",
      change: "+3%",
      icon: MessageSquare,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "ride",
      description: "New ride request from John Doe",
      time: "5 minutes ago",
      status: "pending",
      icon: Car,
    },
    {
      id: 2,
      type: "verification",
      description: "Driver verification approved for Jane Smith",
      time: "1 hour ago",
      status: "completed",
      icon: ShieldCheck,
    },
    {
      id: 3,
      type: "payment",
      description: "Payment processed for ride #1234",
      time: "2 hours ago",
      status: "completed",
      icon: DollarSign,
    },
    {
      id: 4,
      type: "support",
      description: "New support ticket from Mike Johnson",
      time: "3 hours ago",
      status: "pending",
      icon: MessageSquare,
    },
    {
      id: 5,
      type: "user",
      description: "New user registration: Sarah Wilson",
      time: "4 hours ago",
      status: "completed",
      icon: UserPlus,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "completed":
        return "bg-green-500/10 text-green-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header with Search and Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Overview of your platform's performance and recent activities
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-9 w-[200px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Growth Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Platform Growth</CardTitle>
                  <CardDescription>Monthly and weekly performance metrics</CardDescription>
                </div>
                <Select defaultValue="month">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Monthly Growth</p>
                      <p className="text-2xl font-bold">{stats.monthlyGrowth}%</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +2.5%
                    </Badge>
                  </div>
                  <Progress value={stats.monthlyGrowth} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Weekly Growth</p>
                      <p className="text-2xl font-bold">{stats.weeklyGrowth}%</p>
                    </div>
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      +1.2%
                    </Badge>
                  </div>
                  <Progress value={stats.weeklyGrowth} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-primary transition-colors duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center mt-2">
                      <Badge 
                        variant="secondary" 
                        className={stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}
                      >
                        {stat.change} from last month
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions and events</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group"
                      >
                        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                          <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                            <activity.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium group-hover:text-primary transition-colors">
                              {activity.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                          <Badge variant="secondary" className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <UserPlus className="h-6 w-6" />
                    <span>Add New User</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <ShieldCheck className="h-6 w-6" />
                    <span>Verify Drivers</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <MessageSquare className="h-6 w-6" />
                    <span>Support Tickets</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                    <Settings className="h-6 w-6" />
                    <span>Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;