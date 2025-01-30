import React from "react";

interface VideoPreviewProps {
  src: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ src }) => {
  return (
    <div className="video-preview border border-gray-300 rounded-md overflow-hidden">
      <video
        src={src}
        controls
        className="w-full h-auto rounded"
      />
    </div>
  );
};

export default VideoPreview;
