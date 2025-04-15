
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

const ProfilePhoto = ({ userId }) => {
  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // Fetch profile photo on component mount
  useState(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await api.get(`/photos/profile/${userId || ''}`);
        if (response.data.success && response.data.photo) {
          setPhoto(`${api.defaults.baseURL}${response.data.photo.url}`);
        }
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };
    
    fetchProfilePhoto();
  }, [userId]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Only JPEG, PNG and GIF are allowed",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive"
      });
      return;
    }
    
    // Upload file
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await api.post('/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Set as profile photo
        const photoId = response.data.photo.id;
        await api.put(`/photos/profile/${photoId}`);
        
        // Update UI
        setPhoto(`${api.defaults.baseURL}${response.data.photo.url}`);
        
        toast({
          title: "Photo uploaded",
          description: "Your profile photo has been updated"
        });
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Upload failed",
        description: error.response?.data?.message || "Failed to upload photo",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
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
              {isUploading ? (
                <Upload className="h-4 w-4 animate-pulse" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={isUploading}
              />
            </label>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Upload a new profile photo
            </p>
            <p className="text-xs text-muted-foreground">
              Recommended size: 400x400px (max 5MB)
            </p>
            {isUploading && (
              <p className="text-xs text-primary mt-1">
                Uploading...
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePhoto;
