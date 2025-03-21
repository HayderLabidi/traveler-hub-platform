import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Bell, Lock, CreditCard, Globe, Upload, Camera, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Settings = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  const [documents, setDocuments] = useState({
    license: null,
    insurance: null,
    registration: null,
  });
  const [kycSelfie, setKycSelfie] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, verified, rejected

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully."
      });
    }, 1500);
  };

  const handleDocumentUpload = (type, file) => {
    if (file && file.type.startsWith('image/')) {
      setDocuments(prev => ({
        ...prev,
        [type]: file
      }));
      toast({
        title: "Document uploaded",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} document has been uploaded successfully.`,
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload an image file.",
        variant: "destructive",
      });
    }
  };

  const handleKycSelfie = (file) => {
    if (file && file.type.startsWith('image/')) {
      setKycSelfie(file);
      toast({
        title: "KYC selfie uploaded",
        description: "Your KYC selfie has been uploaded successfully.",
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload an image file.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    // Here you would typically send the documents and KYC selfie to your backend
    // For now, we'll simulate a successful verification
    setVerificationStatus("pending");
    toast({
      title: "Verification submitted",
      description: "Your documents have been submitted for verification.",
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

          {/* Verification Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Account Verification
              </CardTitle>
              <CardDescription>Complete your verification to start accepting rides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status */}
              <div className="flex items-center gap-2">
                {verificationStatus === "pending" && (
                  <>
                    <div className="w-4 h-4 rounded-full bg-yellow-500 animate-pulse"></div>
                    <span className="text-yellow-500">Pending Verification</span>
                  </>
                )}
                {verificationStatus === "verified" && (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-green-500">Verified</span>
                  </>
                )}
                {verificationStatus === "rejected" && (
                  <>
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-500">Rejected</span>
                  </>
                )}
              </div>

              {/* Documents Upload */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Driver's License</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDocumentUpload("license", e.target.files[0])}
                      className="hidden"
                      id="license"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("license").click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {documents.license ? "Change License" : "Upload License"}
                    </Button>
                    {documents.license && (
                      <span className="text-sm text-green-500">✓ Uploaded</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Insurance Document</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDocumentUpload("insurance", e.target.files[0])}
                      className="hidden"
                      id="insurance"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("insurance").click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {documents.insurance ? "Change Insurance" : "Upload Insurance"}
                    </Button>
                    {documents.insurance && (
                      <span className="text-sm text-green-500">✓ Uploaded</span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Vehicle Registration</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleDocumentUpload("registration", e.target.files[0])}
                      className="hidden"
                      id="registration"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("registration").click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {documents.registration ? "Change Registration" : "Upload Registration"}
                    </Button>
                    {documents.registration && (
                      <span className="text-sm text-green-500">✓ Uploaded</span>
                    )}
                  </div>
                </div>
              </div>

              {/* KYC Selfie */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>KYC Selfie</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      capture="user"
                      onChange={(e) => handleKycSelfie(e.target.files[0])}
                      className="hidden"
                      id="kyc-selfie"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("kyc-selfie").click()}
                      className="w-full"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {kycSelfie ? "Retake Selfie" : "Take KYC Selfie"}
                    </Button>
                    {kycSelfie && (
                      <span className="text-sm text-green-500">✓ Uploaded</span>
                    )}
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Instructions:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Hold your ID document clearly in front of you</li>
                    <li>Ensure your face and the ID are clearly visible</li>
                    <li>Make sure there's good lighting</li>
                    <li>Keep the camera steady</li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!documents.license || !documents.insurance || !documents.registration || !kycSelfie}
              >
                Submit for Verification
              </Button>
            </CardContent>
          </Card>

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