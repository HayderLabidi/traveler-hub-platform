import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  Moon,
  BellRing,
  FileText,
  HelpCircle
} from "lucide-react";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useAuth } from "@/providers/AuthProvider";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New ride offer", message: "Driver Michael is nearby", time: "5 min ago", read: false },
    { id: 2, title: "Ride confirmed", message: "Your ride to Airport is confirmed", time: "1 hour ago", read: false },
    { id: 3, title: "Payment processed", message: "Your payment of $25 was successful", time: "Yesterday", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const passengerNavItems = [
    { label: "Dashboard", icon: Home, path: "/passenger/dashboard" },
    { label: "Find Ride", icon: Car, path: "/passenger/find-ride" },
    { label: "Schedule Ride", icon: Calendar, path: "/passenger/schedule" },
    { label: "My Bookings", icon: Calendar, path: "/passenger/bookings" },
    { label: "Payment", icon: CreditCard, path: "/passenger/payment" },
    { label: "Messages", icon: MessageSquare, path: "/passenger/messages" },
    { label: "Reviews", icon: Star, path: "/passenger/reviews" },
    { label: "Blog", icon: FileText, path: "/passenger/blog" },
    { label: "Help Centre", icon: HelpCircle, path: "/passenger/help" },
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

  const navItems = user?.type === "passenger" 
    ? passengerNavItems 
    : user?.type === "driver" 
      ? driverNavItems 
      : adminNavItems;

  const handleLogout = () => {
    logout();
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications",
      description: "All notifications marked as read"
    });
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getSidebarColorClass = () => {
    switch (user?.type) {
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
    switch (user?.type) {
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

  const getHoverColorClass = () => {
    switch (user?.type) {
      case "passenger":
        return "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/10 dark:hover:text-blue-300";
      case "driver":
        return "hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-900/10 dark:hover:text-green-300";
      case "admin":
        return "hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/10 dark:hover:text-purple-300";
      default:
        return "hover:bg-gray-100 dark:hover:bg-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex">
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
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    isActive 
                      ? getActiveItemColorClass() 
                      : getHoverColorClass()
                  }`}
                >
                  <item.icon size={20} />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-white dark:bg-gray-950 min-h-screen overflow-hidden">
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1" />

          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  {unreadCount > 0 ? <BellRing size={20} /> : <Bell size={20} />}
                  {unreadCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0">
                <div className="p-4 border-b border-border flex justify-between items-center">
                  <h4 className="font-medium">Notifications</h4>
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-border">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 hover:bg-muted cursor-pointer flex items-start ${notification.read ? 'opacity-70' : 'bg-muted/50'}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="w-2 h-2 mt-1.5 rounded-full mr-3 flex-shrink-0 bg-primary" style={{ opacity: notification.read ? 0 : 1 }} />
                          <div className="flex-1">
                            <div className="font-medium mb-0.5">{notification.title}</div>
                            <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
                <div className="p-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full">
                    View all notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {user?.type === "passenger" ? "P" : user?.type === "driver" ? "D" : "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">
                      {user?.type === "passenger" ? "John Smith" : user?.type === "driver" ? "David Johnson" : "Admin User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.type}</p>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/${user?.type}/profile`)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/${user?.type}/settings`)}>
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

        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
