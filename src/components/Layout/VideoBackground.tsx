import React from 'react';

const VideoBackground: React.FC = () => (
  <div className="fixed inset-0 w-full h-full -z-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
  </div>
);

export default VideoBackground;
