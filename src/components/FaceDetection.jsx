import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import { Button } from '@/components/ui/button';

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

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

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
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

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const detectFrame = async () => {
      if (!isDetecting) return;

      // Draw video frame on canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Detect faces
      const faces = await model.estimateFaces(video, {
        flipHorizontal: false
      });

      // Draw rectangles around detected faces
      faces.forEach(face => {
        const box = face.box;
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.xMin, box.yMin, box.width, box.height);
      });

      // Request next frame
      if (isDetecting) {
        requestAnimationFrame(detectFrame);
      }
    };

    setIsDetecting(true);
    detectFrame();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
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
      </div>
      <div className="flex gap-4">
        <Button onClick={startVideo} disabled={isDetecting}>
          Start Camera
        </Button>
        <Button 
          onClick={detectFaces} 
          disabled={!model || isDetecting}
          variant="secondary"
        >
          Detect Faces
        </Button>
        <Button 
          onClick={stopVideo} 
          variant="destructive"
          disabled={!isDetecting}
        >
          Stop
        </Button>
      </div>
    </div>
  );
};

export default FaceDetection;
