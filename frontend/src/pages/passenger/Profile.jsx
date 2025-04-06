import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload, User, Phone, Mail, CreditCard, Camera, History, Star } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PassengerProfile = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: "John Passenger",
    email: "john.passenger@example.com",
    phone: "+1 234 567 8900",
    photo: "/profile-photo.jpg",
    rating: 4.8,
    totalRides: 25,
    memberSince: "2023-01-15",
    preferences: {
      notifications: true,
      emailUpdates: true,
      smsUpdates: false
    },
    paymentMethods: [
      {
        id: 1,
        type: "Credit Card",
        last4: "4242",
        expiry: "12/25"
      }
    ]
  });

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    }, 1500);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate photo upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({...profile, photo: reader.result});
      };
      reader.readAsDataURL(file);
    }
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
            <h1 className="text-3xl font-bold">Passenger Profile</h1>
          </div>

          {/* Profile Photo */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <CardTitle>Profile Photo</CardTitle>
              </div>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                    {profile.photo ? (
                      <img
                        src={profile.photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-gray-500" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Upload a new profile photo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 400x400px
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                <CardTitle>Personal Information</CardTitle>
              </div>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <History className="h-5 w-5 mr-2" />
                <CardTitle>Your Statistics</CardTitle>
              </div>
              <CardDescription>Your ride history and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    <span className="text-sm text-muted-foreground">Rating</span>
                  </div>
                  <div className="text-2xl font-bold">{profile.rating}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <History className="h-4 w-4 mr-2" />
                    <span className="text-sm text-muted-foreground">Total Rides</span>
                  </div>
                  <div className="text-2xl font-bold">{profile.totalRides}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm text-muted-foreground">Member Since</span>
                  </div>
                  <div className="text-2xl font-bold">{profile.memberSince}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  <CardTitle>Payment Methods</CardTitle>
                </div>
                <Button variant="outline" onClick={() => navigate("/payment-methods")}>
                  Manage
                </Button>
              </div>
              <CardDescription>Your saved payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              {profile.paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg mb-2">
                  <div>
                    <div className="font-medium">{method.type}</div>
                    <div className="text-sm text-muted-foreground">
                      •••• {method.last4} • Expires {method.expiry}
                    </div>
                  </div>
                </div>
              ))}
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

export default PassengerProfile; 