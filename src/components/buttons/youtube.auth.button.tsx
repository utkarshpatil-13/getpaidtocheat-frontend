import React from 'react';

interface YoutubeAuthButtonProps {
  onAuthorize: () => void;
}

const YoutubeAuthButton: React.FC<YoutubeAuthButtonProps> = ({ onAuthorize }) => {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      onClick={onAuthorize}
    >
      Authorize YouTube
    </button>
  );
};

export default YoutubeAuthButton;
