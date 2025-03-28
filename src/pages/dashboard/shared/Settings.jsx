import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Bell, Lock, CreditCard, Globe, Camera } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FaceDetection from "@/components/FaceDetection";

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const isDriver = location.pathname.includes('driver');
  
  const [settings, setSettings] = useState({
    notifications: {
      rideRequests: true,
      messages: true,
      promotions: false,
      updates: true
    },
    privacy: {
      showProfile: true,
      showLocation: true,
      showRating: true
    },
    language: "English",
    currency: "USD"
  });

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully."
      });
    }, 1500);
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

          {/* Face Verification (Only for Drivers) */}
          {isDriver && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  <CardTitle>Face Verification</CardTitle>
                </div>
                <CardDescription>Verify your identity for enhanced security</CardDescription>
              </CardHeader>
              <CardContent>
                <FaceDetection />
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                <CardTitle>Notification Settings</CardTitle>
              </div>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="rideRequests">Ride Requests</Label>
                <Button
                  variant={settings.notifications.rideRequests ? "default" : "outline"}
                  onClick={() => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      rideRequests: !settings.notifications.rideRequests
                    }
                  })}
                >
                  {settings.notifications.rideRequests ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="messages">Messages</Label>
                <Button
                  variant={settings.notifications.messages ? "default" : "outline"}
                  onClick={() => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      messages: !settings.notifications.messages
                    }
                  })}
                >
                  {settings.notifications.messages ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promotions">Promotions</Label>
                <Button
                  variant={settings.notifications.promotions ? "default" : "outline"}
                  onClick={() => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      promotions: !settings.notifications.promotions
                    }
                  })}
                >
                  {settings.notifications.promotions ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="updates">App Updates</Label>
                <Button
                  variant={settings.notifications.updates ? "default" : "outline"}
                  onClick={() => setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      updates: !settings.notifications.updates
                    }
                  })}
                >
                  {settings.notifications.updates ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                <CardTitle>Privacy Settings</CardTitle>
              </div>
              <CardDescription>Control your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="showProfile">Show Profile to Passengers</Label>
                <Button
                  variant={settings.privacy.showProfile ? "default" : "outline"}
                  onClick={() => setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      showProfile: !settings.privacy.showProfile
                    }
                  })}
                >
                  {settings.privacy.showProfile ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showLocation">Show Location</Label>
                <Button
                  variant={settings.privacy.showLocation ? "default" : "outline"}
                  onClick={() => setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      showLocation: !settings.privacy.showLocation
                    }
                  })}
                >
                  {settings.privacy.showLocation ? "Enabled" : "Disabled"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="showRating">Show Rating</Label>
                <Button
                  variant={settings.privacy.showRating ? "default" : "outline"}
                  onClick={() => setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      showRating: !settings.privacy.showRating
                    }
                  })}
                >
                  {settings.privacy.showRating ? "Enabled" : "Disabled"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                <CardTitle>Payment Settings</CardTitle>
              </div>
              <CardDescription>Manage your payment methods and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => navigate("/payment-methods")}>
                Manage Payment Methods
              </Button>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                <CardTitle>Language & Region</CardTitle>
              </div>
              <CardDescription>Set your preferred language and region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={settings.currency}
                  onChange={(e) => setSettings({...settings, currency: e.target.value})}
                />
              </div>
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

export default Settings; 