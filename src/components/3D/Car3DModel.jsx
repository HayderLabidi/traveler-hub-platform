
import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Car3DModel() {
  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'transparent' }}>
      <Spline 
        scene="https://prod.spline.design/cFbLwLGyuy8r9vx8/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
