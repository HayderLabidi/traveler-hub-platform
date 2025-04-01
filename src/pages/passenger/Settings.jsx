
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Bell, Lock, Globe, CreditCard } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const PassengerSettings = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    notifications: {
      rideUpdates: true,
      driverMessages: true,
      promotions: false,
      paymentReceipts: true,
      appUpdates: true
    },
    privacy: {
      shareLocation: true,
      shareRating: true,
      allowDriverContact: true
    },
    preferences: {
      defaultPaymentMethod: "Credit Card",
      language: "English",
      currency: "USD",
      defaultRideType: "Standard"
    }
  });

  const form = useForm({
    defaultValues: {
      ...settings
    }
  });

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings updated",
        description: "Your preferences have been saved successfully"
      });
    }, 1000);
  };

  const updateNotificationSetting = (key, value) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value
      }
    });
  };

  const updatePrivacySetting = (key, value) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Passenger Settings</h1>
          </div>
          <Badge variant="outline" className="bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300">
            Passenger
          </Badge>
        </div>

        <div className="grid gap-6">
          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rideUpdates" className="font-medium">Ride Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about your ride status</p>
                  </div>
                  <Switch 
                    id="rideUpdates" 
                    checked={settings.notifications.rideUpdates}
                    onCheckedChange={(checked) => updateNotificationSetting('rideUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="driverMessages" className="font-medium">Driver Messages</Label>
                    <p className="text-sm text-muted-foreground">Get notified when drivers send you messages</p>
                  </div>
                  <Switch 
                    id="driverMessages" 
                    checked={settings.notifications.driverMessages}
                    onCheckedChange={(checked) => updateNotificationSetting('driverMessages', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="promotions" className="font-medium">Promotions</Label>
                    <p className="text-sm text-muted-foreground">Receive promotional offers and discounts</p>
                  </div>
                  <Switch 
                    id="promotions" 
                    checked={settings.notifications.promotions}
                    onCheckedChange={(checked) => updateNotificationSetting('promotions', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paymentReceipts" className="font-medium">Payment Receipts</Label>
                    <p className="text-sm text-muted-foreground">Get notified about payment transactions</p>
                  </div>
                  <Switch 
                    id="paymentReceipts" 
                    checked={settings.notifications.paymentReceipts}
                    onCheckedChange={(checked) => updateNotificationSetting('paymentReceipts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="appUpdates" className="font-medium">App Updates</Label>
                    <p className="text-sm text-muted-foreground">Stay informed about new features and updates</p>
                  </div>
                  <Switch 
                    id="appUpdates" 
                    checked={settings.notifications.appUpdates}
                    onCheckedChange={(checked) => updateNotificationSetting('appUpdates', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Privacy Settings</CardTitle>
              </div>
              <CardDescription>Control your data and visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="shareLocation" className="font-medium">Share Location</Label>
                    <p className="text-sm text-muted-foreground">Allow drivers to see your precise location</p>
                  </div>
                  <Switch 
                    id="shareLocation" 
                    checked={settings.privacy.shareLocation}
                    onCheckedChange={(checked) => updatePrivacySetting('shareLocation', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="shareRating" className="font-medium">Share Rating</Label>
                    <p className="text-sm text-muted-foreground">Make your rating visible to drivers</p>
                  </div>
                  <Switch 
                    id="shareRating" 
                    checked={settings.privacy.shareRating}
                    onCheckedChange={(checked) => updatePrivacySetting('shareRating', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowDriverContact" className="font-medium">Allow Driver Contact</Label>
                    <p className="text-sm text-muted-foreground">Let drivers contact you outside of rides</p>
                  </div>
                  <Switch 
                    id="allowDriverContact" 
                    checked={settings.privacy.allowDriverContact}
                    onCheckedChange={(checked) => updatePrivacySetting('allowDriverContact', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment & Preferences */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <CardTitle>Payment & Preferences</CardTitle>
              </div>
              <CardDescription>Manage your payment methods and ride preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="defaultPayment" className="mb-2 block font-medium">Default Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant={settings.preferences.defaultPaymentMethod === "Credit Card" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSettings({
                      ...settings,
                      preferences: { ...settings.preferences, defaultPaymentMethod: "Credit Card" }
                    })}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Button>
                  <Button
                    variant={settings.preferences.defaultPaymentMethod === "PayPal" ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSettings({
                      ...settings,
                      preferences: { ...settings.preferences, defaultPaymentMethod: "PayPal" }
                    })}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.5 7H17a2 2 0 0 0-2-2h-4.5a2 2 0 0 0-2 2v10h8a2 2 0 0 0 2-2V9a2 2 0 0 0-1-1.73z"></path>
                      <path d="M14 16a2 2 0 0 0-2 2c0 1.1-.94 2-2.02 2h-1.52a2 2 0 0 1-1.95-1.57L4.16 6.85A2 2 0 0 1 6.1 4h8.4a2 2 0 0 1 1.86 1.26"></path>
                    </svg>
                    PayPal
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language" className="font-medium">Language</Label>
                  <Input
                    id="language"
                    value={settings.preferences.language}
                    onChange={(e) => setSettings({
                      ...settings,
                      preferences: { ...settings.preferences, language: e.target.value }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency" className="font-medium">Currency</Label>
                  <Input
                    id="currency"
                    value={settings.preferences.currency}
                    onChange={(e) => setSettings({
                      ...settings,
                      preferences: { ...settings.preferences, currency: e.target.value }
                    })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="defaultRideType" className="mb-2 block font-medium">Default Ride Type</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {["Economy", "Standard", "Premium", "Family"].map((type) => (
                    <Button
                      key={type}
                      variant={settings.preferences.defaultRideType === type ? "default" : "outline"}
                      onClick={() => setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, defaultRideType: type }
                      })}
                      className="h-auto py-2"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Saving changes...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PassengerSettings;
