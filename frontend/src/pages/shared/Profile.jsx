import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Upload, User, Phone, Mail, Car, Camera } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Profile = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: "John Driver",
    email: "john.driver@example.com",
    phone: "+1 234 567 8900",
    car: {
      make: "Toyota",
      model: "Camry",
      year: "2020",
      color: "Silver",
      licensePlate: "ABC123",
      seats: 4,
      image: "/car-image.jpg"
    },
    photo: "/profile-photo.jpg"
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

  const handleCarPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate car photo upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          car: {...profile.car, image: reader.result}
        });
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
            <h1 className="text-3xl font-bold">Edit Profile</h1>
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

          {/* Car Information */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center">
                <Car className="h-5 w-5 mr-2" />
                <CardTitle>Car Information</CardTitle>
              </div>
              <CardDescription>Update your vehicle details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="carPhoto">Car Photo</Label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      {profile.car.image ? (
                        <img
                          src={profile.car.image}
                          alt="Car"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Car className="h-12 w-12 text-gray-500 m-auto mt-6" />
                      )}
                    </div>
                    <label className="absolute bottom-1 right-1 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleCarPhotoUpload}
                      />
                    </label>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Upload a photo of your car
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Recommended size: 800x600px
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={profile.car.make}
                    onChange={(e) => setProfile({
                      ...profile,
                      car: {...profile.car, make: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={profile.car.model}
                    onChange={(e) => setProfile({
                      ...profile,
                      car: {...profile.car, model: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={profile.car.year}
                    onChange={(e) => setProfile({
                      ...profile,
                      car: {...profile.car, year: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={profile.car.color}
                    onChange={(e) => setProfile({
                      ...profile,
                      car: {...profile.car, color: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    value={profile.car.licensePlate}
                    onChange={(e) => setProfile({
                      ...profile,
                      car: {...profile.car, licensePlate: e.target.value}
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seats">Available Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    value={profile.car.seats}
                    onChange={(e) => setProfile({
                      ...profile,
                      car: {...profile.car, seats: parseInt(e.target.value)}
                    })}
                  />
                </div>
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

export default Profile; 