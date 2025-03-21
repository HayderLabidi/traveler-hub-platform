import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, CheckCircle2, XCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Verification = () => {
  const [documents, setDocuments] = useState({
    license: null,
    insurance: null,
    registration: null,
  });
  const [kycSelfie, setKycSelfie] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, verified, rejected
  const { toast } = useToast();

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
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Driver Verification</h1>
            <p className="text-muted-foreground">
              Complete your verification by uploading required documents and a KYC selfie.
            </p>
          </div>

          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
              <CardDescription>Current status of your account verification</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Documents Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>Upload your driver's license, insurance, and vehicle registration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Driver's License */}
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

              {/* Insurance */}
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

              {/* Vehicle Registration */}
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
            </CardContent>
          </Card>

          {/* KYC Selfie */}
          <Card>
            <CardHeader>
              <CardTitle>KYC Selfie</CardTitle>
              <CardDescription>Take a selfie with your ID to verify your identity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!documents.license || !documents.insurance || !documents.registration || !kycSelfie}
          >
            Submit for Verification
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Verification; 