import React, { useState } from "react";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    youtubeVideoId: string;
    metrics: {
      views: number;
      likes: number;
    };
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="video-card rounded overflow-hidden border-2 border-gray-300 shadow-md">
      {/* <img
        src={video.thumbnail}
        alt={video.title}
        className="rounded-t-lg object-cover w-full h-48"
      /> */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{video.title}</h3>
        <p className="text-md font-medium mb-2">{video.description}</p>
        <p className="text-sm">Views: {video.metrics.views}</p>
        <p className="text-sm">Likes: {video.metrics.likes}</p>
        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Preview Video
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)} // Close modal on backdrop click
        >
          <div
            className="bg-white rounded-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2 shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
          >
            <div className="p-4">
              <h3 className="text-xl font-bold mb-4">{video.title}</h3>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.youtubeVideoId}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              ></iframe>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
