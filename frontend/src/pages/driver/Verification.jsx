import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, CheckCircle2, XCircle, Smartphone, RefreshCcw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { QRCodeSVG } from "qrcode.react";
import Webcam from "react-webcam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Verification = () => {
  const [documents, setDocuments] = useState({
    license: null,
    insurance: null,
    registration: null,
  });
  const [kycSelfie, setKycSelfie] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("pending"); // pending, verified, rejected
  const [showWebcam, setShowWebcam] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const webcamRef = useRef(null);
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

  const captureWebcamPhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      // Convert base64 to file
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "webcam-photo.jpg", { type: "image/jpeg" });
          handleKycSelfie(file);
          setShowWebcam(false);
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

  const mobileVerificationUrl = "your-mobile-verification-url"; // Replace with your actual mobile verification URL

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

          {/* Face Verification */}
          <Card>
            <CardHeader>
              <CardTitle>Face Verification</CardTitle>
              <CardDescription>Complete your face verification using one of the following methods</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="webcam" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="webcam">Use Webcam</TabsTrigger>
                  <TabsTrigger value="qr">Use Phone (QR Code)</TabsTrigger>
                </TabsList>
                <TabsContent value="webcam" className="space-y-4">
                  {showWebcam ? (
                    <div className="space-y-4">
                      <div className="relative rounded-lg overflow-hidden">
                        <Webcam
                          audio={false}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          className="w-full"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button onClick={captureWebcamPhoto} className="flex-1">
                          <Camera className="w-4 h-4 mr-2" />
                          Take Photo
                        </Button>
                        <Button variant="outline" onClick={() => setShowWebcam(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => setShowWebcam(true)} className="w-full">
                      <Camera className="w-4 h-4 mr-2" />
                      Start Camera
                    </Button>
                  )}
                </TabsContent>
                <TabsContent value="qr" className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-4 bg-white rounded-lg">
                      <QRCodeSVG value={mobileVerificationUrl} size={200} />
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      Scan this QR code with your phone to complete face verification
                    </p>
                    <Button variant="outline" className="w-full">
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Generate New QR Code
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={!documents.license || !documents.insurance || !documents.registration || !kycSelfie}
          >
            Submit Verification
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Verification;