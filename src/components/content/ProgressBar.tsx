import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

const ProgressBar: React.FC = () => {
  const progress = useSelector((state: RootState) => state.content.uploadProgress);

  return (
    <div className="progress-bar w-full bg-gray-200 rounded-full overflow-hidden mt-4">
      <div
        className="bg-blue-600 text-xs text-white text-center h-4"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
