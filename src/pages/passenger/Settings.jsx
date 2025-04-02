
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Save, 
  Bell, 
  Lock, 
  Moon, 
  Sun, 
  User, 
  Mail, 
  Phone, 
  HelpCircle, 
  Settings as SettingsIcon
} from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useDarkMode } from "@/providers/DarkModeProvider";

const PassengerSettings = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  });
  
  const [notifications, setNotifications] = useState({
    rideUpdates: true,
    promotions: false,
    emailNotifications: true,
    smsNotifications: true
  });

  const handleInfoChange = (field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully."
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-8 mt-16 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
              <SettingsIcon className="h-6 w-6 mr-2 text-brand-500" />
              <h1 className="text-3xl font-bold">Account Settings</h1>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Button 
              variant="outline" 
              className="flex justify-start items-center"
              onClick={() => navigate("/passenger/profile")}
            >
              <User className="h-4 w-4 mr-2 text-brand-500" />
              <span>Edit Profile</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex justify-start items-center"
              onClick={() => navigate("/payment-methods")}
            >
              <Lock className="h-4 w-4 mr-2 text-brand-500" />
              <span>Payment Methods</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex justify-start items-center"
              onClick={() => navigate("/passenger/help")}
            >
              <HelpCircle className="h-4 w-4 mr-2 text-brand-500" />
              <span>Help Center</span>
            </Button>
          </div>

          {/* Personal Information */}
          <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-muted/40">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-brand-500" />
                <CardTitle>Personal Information</CardTitle>
              </div>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={personalInfo.fullName}
                  onChange={(e) => handleInfoChange('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handleInfoChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    value={personalInfo.phone}
                    onChange={(e) => handleInfoChange('phone', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-muted/40">
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-brand-500" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Update your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Password Reset",
                    description: "Password reset functionality coming soon."
                  });
                }}
              >
                Change Password
              </Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Two-Factor Authentication",
                      description: "This feature is coming soon."
                    });
                  }}
                >
                  Setup
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-muted/40">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-brand-500" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="rideUpdates">Ride Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about your rides
                  </p>
                </div>
                <Switch
                  id="rideUpdates"
                  checked={notifications.rideUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, rideUpdates: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="promotions">Promotions</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional offers and discounts
                  </p>
                </div>
                <Switch
                  id="promotions"
                  checked={notifications.promotions}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, promotions: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, emailNotifications: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, smsNotifications: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="bg-muted/40">
              <div className="flex items-center">
                {isDarkMode ? 
                  <Moon className="h-5 w-5 mr-2 text-brand-500" /> : 
                  <Sun className="h-5 w-5 mr-2 text-brand-500" />
                }
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize the app appearance</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark mode
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    id="darkMode"
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-brand-500 hover:bg-brand-600"
            >
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PassengerSettings;
