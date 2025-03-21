
import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Car } from 'lucide-react';

export default function Car3DModel() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    console.error("Failed to load 3D car model");
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '400px', 
        borderRadius: '0.75rem', 
        overflow: 'hidden', 
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 bg-opacity-50 z-10">
          <div className="animate-spin h-8 w-8 border-4 border-brand-500 rounded-full border-t-transparent"></div>
        </div>
      )}
      
      {hasError ? (
        <div className="flex flex-col items-center justify-center p-8 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
          <Car size={100} className="text-brand-500 mb-4" />
          <p className="text-lg text-center text-gray-600 dark:text-gray-400">
            3D model couldn't be loaded
          </p>
        </div>
      ) : (
        <Spline 
          scene="https://prod.spline.design/cFbLwLGyuy8r9vx8/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
          onError={handleError}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}
