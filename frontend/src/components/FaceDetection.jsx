import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, CheckCircle2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [idDocument, setIdDocument] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'verified', 'failed'
  const { toast } = useToast();

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const model = await faceDetection.createDetector(
        faceDetection.SupportedModels.MediaPipeFaceDetector,
        {
          runtime: 'tfjs',
          modelType: 'short',
        }
      );
      setModel(model);
    };
    loadModel();
  }, []);

  const handleIdUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIdDocument(file);
      setVerificationStatus('pending');
      toast({
        title: "ID Document Uploaded",
        description: "Your ID document has been uploaded successfully. You can now proceed with face verification.",
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a valid image file.",
        variant: "destructive",
      });
    }
  };

  const startVideo = async () => {
    if (!idDocument) {
      toast({
        title: "Upload Required",
        description: "Please upload your ID document first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopVideo = () => {
    const stream = videoRef.current?.srcObject;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsDetecting(false);
  };

  const detectFaces = async () => {
    if (!model || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detectFrame = async () => {
      if (!isDetecting) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const faces = await model.estimateFaces(video, {
        flipHorizontal: false
      });

      faces.forEach(face => {
        const box = face.box;
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.xMin, box.yMin, box.width, box.height);
      });

      if (faces.length === 1) {
        // Simulate face verification success after 3 seconds
        setTimeout(() => {
          setVerificationStatus('verified');
          stopVideo();
          toast({
            title: "Verification Successful",
            description: "Your face has been verified successfully.",
          });
        }, 3000);
        return;
      } else if (faces.length > 1) {
        setVerificationStatus('failed');
        stopVideo();
        toast({
          title: "Verification Failed",
          description: "Multiple faces detected. Please ensure only your face is visible.",
          variant: "destructive",
        });
        return;
      }

      if (isDetecting) {
        requestAnimationFrame(detectFrame);
      }
    };

    setIsDetecting(true);
    detectFrame();
  };

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Verified
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive">
            <XCircle className="w-4 h-4 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            Pending Verification
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Verification Status */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Verification Status</h2>
        {getStatusBadge()}
      </div>

      {/* ID Document Upload Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">ID Document</Label>
              <p className="text-sm text-muted-foreground">
                Please upload a clear photo of your ID document (passport, driver's license, or national ID)
              </p>
            </div>
            {idDocument && (
              <span className="text-sm text-green-500 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Uploaded
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleIdUpload}
              className="hidden"
              id="id-document"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('id-document').click()}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              {idDocument ? "Change Document" : "Upload Document"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Face Detection Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-semibold">Face Verification</Label>
            <p className="text-sm text-muted-foreground">
              Please look directly at the camera and ensure good lighting
            </p>
          </div>
          <div className="relative w-full max-w-2xl aspect-video bg-black/10 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
            {!idDocument && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center p-4">
                <p>Please upload your ID document first to enable face verification</p>
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={startVideo} 
              disabled={!idDocument || isDetecting || verificationStatus === 'verified'} 
              className="flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              Start Camera
            </Button>
            <Button 
              onClick={detectFaces} 
              disabled={!model || !idDocument || isDetecting || verificationStatus === 'verified'}
              variant="secondary"
              className="flex-1"
            >
              Verify Face
            </Button>
            <Button 
              onClick={stopVideo} 
              variant="destructive"
              disabled={!isDetecting}
              className="flex-1"
            >
              Stop
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FaceDetection;
