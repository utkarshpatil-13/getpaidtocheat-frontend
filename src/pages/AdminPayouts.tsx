import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { loadYoutubeContent } from "../redux/store/slices/adminSlice";

const UserContentPage = () => {
  const { id } = useParams(); // Retrieve the user ID from the URL
  const [contentAmounts, setContentAmounts] = useState<number[]>([]); // Store the payout amounts for each content
  const [totalAmount, setTotalAmount] = useState(0); // Store the total amount to be paid

  const dispatch = useAppDispatch();

  // Fetch user content when the component mounts or when the user ID changes
  useEffect(() => {
    if (id) {
      dispatch(loadYoutubeContent(id));
    }
  }, [id]);

  const { content, loading } = useAppSelector((state) => state.admin);

  // Handle the input change for content amounts and update the total
  const handleAmountChange = (index: number, amount: string) => {
    const updatedAmounts = [...contentAmounts];
    updatedAmounts[index] = parseFloat(amount) || 0;
    setContentAmounts(updatedAmounts);

    const total = updatedAmounts.reduce((sum, amount) => sum + amount, 0);
    setTotalAmount(total);
  };

  // Handle saving the payouts
  const onSavePayouts = async () => {
    try {
      await axios.post("/api/payouts", {
        userId: id,
        payouts: contentAmounts, // Pass the payout amounts for each content
      });
      alert("Payouts saved successfully!");
    } catch (error) {
      console.error("Error saving payouts", error);
      alert("Error saving payouts");
    }
  };

  // Show loading message or render content
  if (loading) {
    return <div>Loading user details...</div>;
  }

  return (
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
                <td className="border px-4 py-2">{item.metrics.comments}</td>
                <td className="border px-4 py-2">{item.metrics.engagementScore}</td>
                <td className="border px-4 py-2">
                  <button
                    type="button"
                    onClick={() => window.open(item.videoUrl, "_blank")}
                    className="btn btn-primary"
                  >
                    Preview
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="number"
                    value={contentAmounts[index] || ""}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
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
            <button
              type="button"
              onClick={() => {
                const total = contentAmounts.reduce((sum, amount) => sum + amount, 0);
                setTotalAmount(total);
              }}
              className="btn btn-secondary"
            >
              Calculate Total
            </button>
            <div>Total Amount: {totalAmount}</div>
          </div>
          <button
            type="button"
            onClick={onSavePayouts}
            className="btn btn-success"
          >
            Save Payouts
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserContentPage;
