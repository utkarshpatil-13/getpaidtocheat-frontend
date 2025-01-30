// UsersPage.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import {
  fetchUsers,
  loadYoutubeContent,
} from "../redux/store/slices/adminSlice";
import { useParams } from "react-router-dom";
import { approvePayouts } from "../services/payouts.services";

// Interface for Metrics
interface Metrics {
  views: number;
  likes: number;
  comments: number;
  engagementScore: number;
}

// Interface for Video Content
interface VideoContent {
  id: string; // Unique identifier for the content
  title: string; // Title of the video
  description: string; // Description of the video
  videoUrl: string; // URL for video preview
  youtubeVideoId: string; // YouTube video ID for embedding
  metrics: Metrics; // Metrics related to the video
}

const UsersPage = () => {
  const { id } = useParams(); // Retrieve the user ID from the URL
  const [contentAmounts, setContentAmounts] = useState<number[]>([]); // Store the payout amounts for each content
  const [totalAmount, setTotalAmount] = useState(0); // Store the total amount to be paid
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null); // Store selected video details for the modal

  const dispatch = useAppDispatch();
  const { users, content, loading, error } = useAppSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch action to fetch users when the component mounts
    if (id) {
      dispatch(loadYoutubeContent(id));
    }
  }, [dispatch, id]);

  console.log(users);
  console.log(id);

  // Handle the input change for content amounts and update the total
  const handleAmountChange = (index: number, amount: string) => {
    const updatedAmounts = [...contentAmounts];
    updatedAmounts[index] = parseFloat(amount) || 0;
    setContentAmounts(updatedAmounts);

    const total = updatedAmounts.reduce((sum, amount) => sum + amount, 0);
    setTotalAmount(total);
  };

  const onSavePayouts = async () => {
    // Ensure contentAmounts is correctly populated
    const contentAmountsMap = content.reduce((acc: Record<string, number>, item, index) => {
      acc[item.id] = contentAmounts[index] || 0; // This will work now, as contentAmounts is properly initialized
      return acc;
    }, {});

    console.log(contentAmountsMap);
  
    try {
      // Now you can safely call approvePayouts with the populated contentAmountsMap
      await approvePayouts(id as string, contentAmountsMap);
      alert('Payouts saved successfully!');
    } catch (error: any) {
      console.error('Error saving payouts:', error);
      alert(error.message || 'Error saving payouts');
    }
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {id === undefined && (
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">Users List</h1>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">
                    <Link to={`/admin/users/${user.id}`}>
                      <button className="btn text-blue-500">
                        View Content
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {id !== undefined && (
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">User Content for {id}</h1>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {/* Render content table */}
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Views</th>
                  <th className="border px-4 py-2">Likes</th>
                  <th className="border px-4 py-2">Comments</th>
                  <th className="border px-4 py-2">Engagement Score</th>
                  <th className="border px-4 py-2">Video Preview</th>
                  <th className="border px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {content.map((item, index) => (
                  <tr key={item.id} className="text-center">
                    <td className="border px-4 py-2">{item.id}</td>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">{item.metrics.views}</td>
                    <td className="border px-4 py-2">{item.metrics.likes}</td>
                    <td className="border px-4 py-2">
                      {item.metrics.comments}
                    </td>
                    <td className="border px-4 py-2">
                      {item.metrics.engagementScore}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedVideo(item); // Set the selected video details
                          setShowModal(true); // Show the modal
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Preview
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        value={contentAmounts[index] || ""}
                        onChange={(e) =>
                          handleAmountChange(index, e.target.value)
                        }
                        className="border px-2 py-1 w-20"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total amount and save payouts */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Total Amount: {totalAmount}</div>
              </div>
              <button
                type="button"
                onClick={onSavePayouts}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save Payouts
              </button>
            </div>
          </form>

          {/* Modal for video preview */}
          {showModal && selectedVideo && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={() => setShowModal(false)} // Close modal on backdrop click
            >
              <div
                className="bg-white rounded-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2 shadow-lg relative"
                onClick={(e) => e.stopPropagation()} // Prevent click propagation to backdrop
              >
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4">
                    {selectedVideo.title}
                  </h3>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeVideoId}`}
                    title={selectedVideo.title}
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
      )}
    </div>
  );
};

export default UsersPage;
