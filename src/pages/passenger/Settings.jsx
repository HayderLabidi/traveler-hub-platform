
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Bell, Lock, Moon, Sun, User, Mail, Phone, HelpCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useDarkMode } from "@/providers/DarkModeProvider";

const PassengerSettings = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    rideUpdates: true,
    promotions: false,
    emailNotifications: true,
    smsNotifications: true
  });

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
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          {/* Profile Settings */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <CardTitle>Profile</CardTitle>
              </div>
              <CardDescription>Manage your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/passenger/profile")}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Update your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the app appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark mode
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                <CardTitle>Help & Support</CardTitle>
              </div>
              <CardDescription>Get help and support</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/passenger/help")}
              >
                Help Center
              </Button>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave}>
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
