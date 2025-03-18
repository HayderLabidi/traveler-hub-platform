import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { Users, Car, ChevronRight, Settings, MessageSquare, CreditCard } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeDrivers: 78,
    totalRides: 3567,
    pendingApprovals: 12
  });

  return (
    <DashboardLayout userType="admin">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold">{stats.activeDrivers}</p>
              </div>
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Rides</p>
                <p className="text-2xl font-bold">{stats.totalRides}</p>
              </div>
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
              </div>
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Driver Approvals</CardTitle>
            <CardDescription>Pending driver registrations requiring approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Driver #{item}</p>
                    <p className="text-sm text-muted-foreground">Applied: {item} day{item !== 1 ? 's' : ''} ago</p>
                  </div>
                  <Button size="sm">
                    Review
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate("/admin/drivers")}>
                View All Pending Approvals
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New user registration", time: "10 minutes ago" },
                { action: "Driver approved", time: "1 hour ago" },
                { action: "Payment processed", time: "3 hours ago" },
                { action: "Ride completed", time: "6 hours ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>API Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Gateway</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  Operational
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 