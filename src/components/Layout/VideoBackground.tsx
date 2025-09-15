import React from 'react';

const VideoBackground: React.FC = () => (
  <video
    className="fixed inset-0 w-full h-full object-cover -z-20"
    src="/video/PC_Video_Generation_Request.mp4"
    autoPlay
    loop
    muted
    playsInline
  />
);

export default VideoBackground;
