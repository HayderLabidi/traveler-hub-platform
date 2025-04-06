
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { useDarkMode } from "@/providers/DarkModeProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Importing our new components
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import PersonalInformation from "@/components/profile/PersonalInformation";
import Statistics from "@/components/profile/Statistics";
import PaymentMethods from "@/components/profile/PaymentMethods";

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

          {/* Profile Photo Component */}
          <ProfilePhoto 
            photo={profile.photo} 
            onPhotoChange={(newPhoto) => setProfile({...profile, photo: newPhoto})}
          />

          {/* Personal Information Component */}
          <PersonalInformation 
            profile={profile} 
            onChange={setProfile}
          />

          {/* Statistics Component */}
          <Statistics 
            rating={profile.rating}
            totalRides={profile.totalRides}
            memberSince={profile.memberSince}
          />

          {/* Payment Methods Component */}
          <PaymentMethods 
            paymentMethods={profile.paymentMethods}
          />

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
