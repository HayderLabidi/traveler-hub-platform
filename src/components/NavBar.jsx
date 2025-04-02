
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, LogOut, User, Home, Settings, BellRing, Check } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const NavBar = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState([
    { id: 1, title: "New ride offer", message: "Driver Michael is nearby", time: "5 min ago", read: false },
    { id: 2, title: "Ride confirmed", message: "Your ride to Airport is confirmed", time: "1 hour ago", read: false },
    { id: 3, title: "Payment processed", message: "Your payment of $25 was successful", time: "Yesterday", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
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

  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.type) {
      case "passenger":
        return "/passenger/dashboard";
      case "driver":
        return "/driver/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-500">RideShare</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/" className="nav-link">Home</Link>
                  <Link to="/about" className="nav-link">About</Link>
                  <Link to="/contact" className="nav-link">Contact</Link>
                  <Link to="/faq" className="nav-link">FAQ</Link>
                  <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <Button 
                    variant="outline" 
                    className="ml-4"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </Button>
                  <Button 
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </Button>
                </>
              ) : (
                <>
                  {user.type === "admin" && (
                    <Link to="/" className="nav-link flex items-center">
                      <Home className="w-4 h-4 mr-1" />
                      Frontend
                    </Link>
                  )}
                  <Link to="/faq" className="nav-link">FAQ</Link>
                  
                  {/* Notification Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {unreadCount > 0 ? <BellRing size={20} /> : <BellRing size={20} />}
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
                          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="flex items-center">
                            <Check className="h-4 w-4 mr-1" />
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
                  
                  <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/01.png" alt={user.email} />
                          <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/${user.type}/profile`)}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/${user.type}/settings`)}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {unreadCount > 0 ? <BellRing size={20} /> : <BellRing size={20} />}
                    {unreadCount > 0 && (
                      <Badge 
                        className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-0">
                  <div className="p-3 border-b border-border flex justify-between items-center">
                    <h4 className="font-medium">Notifications</h4>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead} className="flex items-center text-xs">
                        <Check className="h-3 w-3 mr-1" />
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
                            className={`p-3 hover:bg-muted cursor-pointer flex items-start ${notification.read ? 'opacity-70' : 'bg-muted/50'}`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="w-2 h-2 mt-1.5 rounded-full mr-2 flex-shrink-0 bg-primary" style={{ opacity: notification.read ? 0 : 1 }} />
                            <div className="flex-1">
                              <div className="font-medium text-sm mb-0.5">{notification.title}</div>
                              <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-muted-foreground text-sm">
                        No notifications
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-in-right">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background shadow-lg">
            {!isAuthenticated ? (
              <>
                <Link to="/" className="block nav-link">Home</Link>
                <Link to="/about" className="block nav-link">About</Link>
                <Link to="/contact" className="block nav-link">Contact</Link>
                <Link to="/faq" className="block nav-link">FAQ</Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Log in
                </Button>
                <Button 
                  className="w-full mt-2"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                {user.type === "admin" && (
                  <Link to="/" className="block nav-link flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    Frontend
                  </Link>
                )}
                <Link to="/faq" className="block nav-link">FAQ</Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    navigate(getDashboardLink());
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    navigate(`/${user.type}/profile`);
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    navigate(`/${user.type}/settings`);
                    setIsMenuOpen(false);
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
