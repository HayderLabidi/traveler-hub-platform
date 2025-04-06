
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Camera } from "lucide-react";

const ProfilePhoto = ({ photo, onPhotoChange }) => {
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
              {photo ? (
                <img
                  src={photo}
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
  );
};

export default ProfilePhoto;
