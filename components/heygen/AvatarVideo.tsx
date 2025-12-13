"use client";

import React from "react";

export const AvatarVideo = React.forwardRef<HTMLVideoElement>((_, ref) => {
  return (
    <video
      ref={ref}
      autoPlay
      playsInline
      className="w-full h-full object-contain"
    />
  );
});

AvatarVideo.displayName = "AvatarVideo";


