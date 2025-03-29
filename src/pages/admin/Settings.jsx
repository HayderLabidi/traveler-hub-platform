import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "RideShare",
    supportEmail: "support@rideshare.com",
    contactPhone: "555-123-4567",
    platformFee: "15",
    maintenanceMode: false,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripePK: "pk_test_51XXXXXXXXXXXXXXXXXXXXXX",
    driverPayout: "85",
    minimumFare: "5.00",
    cancellationFee: "3.00",
    autoPayouts: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  });

  const handleGeneralSettingsSave = () => {
    // In a real app, this would be an API call
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully",
    });
  };

  const handlePaymentSettingsSave = () => {
    toast({
      title: "Settings saved",
      description: "Payment settings have been updated successfully",
    });
  };

  const handleNotificationSettingsSave = () => {
    toast({
      title: "Settings saved",
      description: "Notification settings have been updated successfully",
    });
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">System Settings</h1>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage basic platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platformFee">Platform Fee (%)</Label>
                    <Input
                      id="platformFee"
                      type="number"
                      value={generalSettings.platformFee}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, platformFee: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                    />
                    <Label htmlFor="maintenanceMode" className="font-medium">Maintenance Mode</Label>
                  </div>
                  {generalSettings.maintenanceMode && (
                    <div className="mt-2 flex p-3 bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 rounded-md">
                      <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <p className="text-sm">
                        When enabled, the site will be inaccessible to regular users. Only admins will be able to access the site.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleGeneralSettingsSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment providers and fee structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripePK">Stripe Public Key</Label>
                    <Input
                      id="stripePK"
                      value={paymentSettings.stripePK}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePK: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driverPayout">Driver Payout (%)</Label>
                    <Input
                      id="driverPayout"
                      type="number"
                      value={paymentSettings.driverPayout}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, driverPayout: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minimumFare">Minimum Fare ($)</Label>
                    <Input
                      id="minimumFare"
                      value={paymentSettings.minimumFare}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, minimumFare: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cancellationFee">Cancellation Fee ($)</Label>
                    <Input
                      id="cancellationFee"
                      value={paymentSettings.cancellationFee}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, cancellationFee: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoPayouts"
                      checked={paymentSettings.autoPayouts}
                      onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, autoPayouts: checked })}
                    />
                    <Label htmlFor="autoPayouts" className="font-medium">Automatic Driver Payouts</Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    When enabled, driver payouts will be processed automatically on a weekly basis.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePaymentSettingsSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system-wide notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send automated emails for important system events
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send push notifications to mobile app users
                      </p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, pushNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications" className="font-medium">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send SMS for critical alerts (additional charges apply)
                      </p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails" className="font-medium">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Send promotional emails and newsletters to users
                      </p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, marketingEmails: checked })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNotificationSettingsSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage security and authentication settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-8 text-center text-muted-foreground">
                  Security settings would be implemented here, including:
                  <ul className="list-disc text-left mt-4 max-w-md mx-auto">
                    <li>Password policies</li>
                    <li>Two-factor authentication requirements</li>
                    <li>API key management</li>
                    <li>Session timeout settings</li>
                    <li>Login attempt limits</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button disabled>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;