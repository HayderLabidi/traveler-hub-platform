
import React from 'react';
import OpeningScene from './3DOpening/OpeningScene';

const LoadingPage = ({
  duration = 3000,
  onComplete = () => {}
}) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-background">
      <OpeningScene onStart={onComplete} />
    </div>
  );
};

export default LoadingPage;
