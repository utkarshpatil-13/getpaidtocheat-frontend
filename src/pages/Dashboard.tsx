import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import {
  loadYoutubeMetrics,
  loadPayoutHistory,
  loadSubscription,
  loadSocialAccounts,
} from "../redux/store/slices/dashboard.slice";
import YoutubeAuthButton from "../components/buttons/youtube.auth.button";
import MetricsChart from "../components/charts/metrics.charts";
import {
  authorizeYoutube,
  youtubeCallback,
} from "../services/dashboard.services";
import { Link } from "react-router-dom";

// Dummy Data Example
const dummyVideoMetrics = [
  {
    id: 1,
    thumbnail: "https://via.placeholder.com/400x200?text=Video+Thumbnail+1",
    title: "Learn React in 10 Minutes",
    description: "A quick and comprehensive guide to React basics.",
    metrics: { views: 1200, likes: 600, comments : 76,
      engagementScore : 8.6 },
  },
  {
    id: 2,
    thumbnail: "https://via.placeholder.com/400x200?text=Video+Thumbnail+2",
    title: "Advanced TypeScript",
    description: "Master TypeScript with this deep dive tutorial.",
    metrics: { views: 890, likes: 470, comments : 76,
      engagementScore : 8.6 },
  },
  {
    id: 3,
    thumbnail: "https://via.placeholder.com/400x200?text=Video+Thumbnail+3",
    title: "JavaScript Best Practices",
    description: "Learn the best practices to write clean JavaScript code.",
    metrics: { views: 1560, likes: 890, comments : 76,
      engagementScore : 8.6 },
  },
  {
    id: 4,
    thumbnail: "https://via.placeholder.com/400x200?text=Video+Thumbnail+4",
    title: "CSS Animation Tips",
    description: "Take your CSS animations to the next level.",
    metrics: { views: 970, likes: 520, comments : 76,
      engagementScore : 8.6 },
  },
  {
    id: 5,
    thumbnail: "https://abh.ai/nature/400/400",
    title: "Node.js Crash Course",
    description: "Get up and running with Node.js in under 30 minutes.",
    metrics: { views: 2310, likes: 1456, comments : 76,
      engagementScore : 8.6 },
  },
];

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    metrics,
    youtubeAuthRequired,
    payouts,
    subscription,
    loading,
    socialAccounts,
  } = useAppSelector((state) => state.dashboard);

  console.log(socialAccounts);
  console.log(metrics);
  console.log(subscription);
  console.log(payouts);

  useEffect(() => {
    dispatch(loadSocialAccounts());
    dispatch(loadPayoutHistory());
    dispatch(loadSubscription());
    dispatch(loadYoutubeMetrics());
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      handleYoutubeCallback(code);
    }
  }, [location]);

  const handleYoutubeAuth = async () => {
    if (youtubeAuthRequired || !socialAccounts.find((account) => account.platform === "YouTube")) {
      await authorizeYoutube();
    }
  };

  const handleYoutubeCallback = async (code: string) => {
    try {
      console.log("Request code sending...");
      await youtubeCallback(code);
      console.log("Processing YouTube authorization callback...");
      await dispatch(loadYoutubeMetrics());
    } catch (error) {
      console.error("Error processing YouTube callback:", error);
    }
  };

  return (
    <div className="dashboard max-w-7xl mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900">
        User Dashboard
      </h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* YouTube Authorization Button */}
      {youtubeAuthRequired && (
        <div className="youtube-auth mt-8 p-6 bg-white rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            You need to authorize YouTube
          </h2>
          <YoutubeAuthButton onAuthorize={handleYoutubeAuth} />
        </div>
      )}

      {/* Metrics Section */}
      {metrics.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 text-center p-6 bg-gray-100 rounded-lg shadow-md mt-8">
          <p className="text-lg text-gray-700">
            You haven't uploaded any content yet. Please go to the content
            management page to upload videos.
          </p>
          <Link
            className="w-fit bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
            to="/content-management"
          >
            Go to Content Management
          </Link>
        </div>
      ) : (
        <div className="metrics bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Metrics</h2>
          <MetricsChart data={metrics} />
        </div>
      )}

      {/* Payout History */}
      {Array.isArray(payouts) && payouts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-center p-6 bg-gray-100 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Payouts</h2>
          <p className="text-lg text-gray-700">
            You don't have any payouts yet.
          </p>
        </div>
      ) : (
        <div className="payout-history bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Payout History
          </h2>
          <ul className="space-y-4">
            {Array.isArray(payouts) &&
              payouts.map((payout) => (
                <li key={payout.id} className="border-b pb-4 text-gray-700">
                  <p>
                    <strong>Date:</strong> {payout.date}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${payout.amount}
                  </p>
                  <p>
                    <strong>Status:</strong> {payout.status}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Subscription Status */}
      {subscription == null || Object.keys(subscription).length === 0 ? (
        <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Subscription Status
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            You are not currently subscribed to a plan. Please subscribe to one
            of our plans to access exclusive content and features.
          </p>
          <Link
            to="/subscribe"
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Subscribe Now
          </Link>
        </div>
      ) : (
        <div className="subscription-status bg-white p-6 rounded-lg shadow-md mt-8 transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Subscription Status
          </h2>
          <p className="text-gray-700">
            Plan: {subscription.plan} | Renewal Date: {subscription.renewalDate}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
