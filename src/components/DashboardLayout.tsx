
import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  Calendar, 
  CreditCard, 
  MessageSquare, 
  Car, 
  Star,
  Sun,
  Moon
} from "lucide-react";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "passenger" | "driver" | "admin";
}

const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passengerNavItems = [
    { label: "Dashboard", icon: Home, path: "/passenger/dashboard" },
    { label: "Find Ride", icon: Car, path: "/passenger/find-ride" },
    { label: "My Bookings", icon: Calendar, path: "/passenger/bookings" },
    { label: "Payment", icon: CreditCard, path: "/passenger/payment" },
    { label: "Messages", icon: MessageSquare, path: "/passenger/messages" },
    { label: "Reviews", icon: Star, path: "/passenger/reviews" },
  ];

  const driverNavItems = [
    { label: "Dashboard", icon: Home, path: "/driver/dashboard" },
    { label: "My Rides", icon: Car, path: "/driver/rides" },
    { label: "Schedule", icon: Calendar, path: "/driver/schedule" },
    { label: "Earnings", icon: CreditCard, path: "/driver/earnings" },
    { label: "Messages", icon: MessageSquare, path: "/driver/messages" },
    { label: "Reviews", icon: Star, path: "/driver/reviews" },
  ];

  const adminNavItems = [
    { label: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { label: "Users", icon: User, path: "/admin/users" },
    { label: "Rides", icon: Car, path: "/admin/rides" },
    { label: "Payments", icon: CreditCard, path: "/admin/payments" },
    { label: "Support", icon: MessageSquare, path: "/admin/support" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const navItems = userType === "passenger" 
    ? passengerNavItems 
    : userType === "driver" 
      ? driverNavItems 
      : adminNavItems;

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const getSidebarColorClass = () => {
    switch (userType) {
      case "passenger":
        return "bg-blue-50 dark:bg-blue-950/20";
      case "driver":
        return "bg-green-50 dark:bg-green-950/20";
      case "admin":
        return "bg-purple-50 dark:bg-purple-950/20";
      default:
        return "bg-gray-50 dark:bg-gray-900";
    }
  };

  const getActiveItemColorClass = () => {
    switch (userType) {
      case "passenger":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "driver":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      default:
        return "bg-gray-200 dark:bg-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`${getSidebarColorClass()} border-r border-gray-200 dark:border-gray-800 fixed inset-y-0 z-50 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 md:w-16"
        } overflow-y-auto md:relative`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-brand-500">RideShare</span>
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md p-1"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="mt-6 px-4">
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  index === 0 ? getActiveItemColorClass() : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-950 min-h-screen overflow-hidden">
        {/* Top navbar */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1" />

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => toast({ title: "Notifications", description: "You have no new notifications" })}
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {userType === "passenger" ? "P" : userType === "driver" ? "D" : "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">
                      {userType === "passenger" ? "John Smith" : userType === "driver" ? "David Johnson" : "Admin User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userType}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/${userType}/profile`)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/${userType}/settings`)}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
