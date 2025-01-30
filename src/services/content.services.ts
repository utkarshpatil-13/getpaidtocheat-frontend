import axios, { AxiosProgressEvent } from "axios";

const token = localStorage.getItem('accessToken');

export const uploadVideoToBackend = async (
  file: File,
  title: string,
  description: string,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const formData = new FormData();
  formData.append("video", file);
  formData.append("title", title);
  formData.append("description", description);

  const response = await axios.post("https://getpaidtocheat-backend.onrender.com/api/youtube/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    },
    onUploadProgress,
  });

  return response.data;
};
