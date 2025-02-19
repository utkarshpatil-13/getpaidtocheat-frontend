import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadVideo } from '../../redux/store/slices/content.slice'
import ProgressBar from "./ProgressBar";
import VideoPreview from "./VideoPreview";
import { AppDispatch } from "../../redux/store/store";

const FileUploadForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type and size
      if (!selectedFile.type.startsWith("video/")) {
        alert("Please upload a valid video file.");
        return;
      }
      if (selectedFile.size > 100 * 1024 * 1024) {
        alert("File size exceeds the limit of 100MB.");
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Show video preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !description) {
      alert("Please fill all fields and select a video.");
      return;
    }

    setUploading(true);
    dispatch(uploadVideo({ file, title, description }))
      .unwrap() // Unwraps the result or throws an error
      .then(() => {
        alert("Video uploaded successfully!");
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      })
      .finally(() => {
        setUploading(false);
        setTitle("");
        setDescription("");
        setFile(null);
        setPreviewUrl(null);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h2 className="text-3xl font-bold py-6">Upload Your Video</h2>
      <div className="upload-form bg-white p-6 rounded-lg shadow-md">

        <form onSubmit={handleSubmit} className="w-[40vw]">
          <div className="mb-4">
            <label className="block text-gray-700">Video Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded text-black"
              placeholder="Enter video title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Video Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded text-black"
              placeholder="Enter video description"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Select Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="mt-2 p-2 w-80 border border-gray-300 rounded"
            />
          </div>

          {previewUrl && (
            <div className="mb-4">
              <h3 className="text-gray-700">Video Preview</h3>
              <VideoPreview src={previewUrl} />
            </div>
          )}

          {uploading ? (
            <ProgressBar />
          ) : (
            <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Upload Video
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default FileUploadForm;
