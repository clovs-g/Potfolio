import React from 'react';
import Spline from '@splinetool/react-spline';

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Spline scene="https://prod.spline.design/auVyShY-c9sMJcKU/scene.splinecode" />
    </div>
  );
};

export default HeroScene;