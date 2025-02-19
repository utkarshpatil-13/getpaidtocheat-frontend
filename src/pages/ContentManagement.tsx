import React, { useEffect, useState } from "react";
import VideoCard from "../components/content/VideoCard";
import Filters from "../components/content/Filters";
import PaginationControls from "../components/content/PaginationControls";
import { loadYoutubeMetrics } from "../redux/store/slices/dashboard.slice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import YoutubeAuthButton from "../components/buttons/youtube.auth.button";
import { authorizeYoutube } from "../services/dashboard.services";

type Filters = {
  dateRange?: "lastWeek" | "lastMonth" | "allTime"; // Optional property
  sortBy?: "views" | "likes"; // Optional property
};

// const dummy = [
//   {
//     "id": 1,
//     "thumbnail": "https://abh.ai/nature/900/900",
//     "title": "How to Build a Full-Stack App",
//     "description": "Learn how to create a full-stack application from scratch using MERN stack.",
//     "metrics": {
//       "views": 12034,
//       "likes": 874
//     }
//   },
//   {
//     "id": 2,
//     "thumbnail": "https://via.placeholder.com/400x200?text=Video+Thumbnail+2",
//     "title": "Mastering TypeScript",
//     "description": "Dive deep into TypeScript and level up your JavaScript skills.",
//     "metrics": {
//       "views": 8934,
//       "likes": 502
//     }
//   },
//   {
//     "id": 3,
//     "thumbnail": "https://via.placeholder.com/400x200?text=Video+Thumbnail+3",
//     "title": "React + Vite: The Ultimate Guide",
//     "description": "Boost your React development workflow using Vite and Tailwind CSS.",
//     "metrics": {
//       "views": 15420,
//       "likes": 1094
//     }
//   },
//   {
//     "id": 4,
//     "thumbnail": "https://via.placeholder.com/400x200?text=Video+Thumbnail+4",
//     "title": "Understanding Redux Toolkit",
//     "description": "Simplify your state management with Redux Toolkit.",
//     "metrics": {
//       "views": 6743,
//       "likes": 320
//     }
//   },
//   {
//     "id": 5,
//     "thumbnail": "https://via.placeholder.com/400x200?text=Video+Thumbnail+5",
//     "title": "Node.js Crash Course",
//     "description": "Get up and running with Node.js in under 30 minutes.",
//     "metrics": {
//       "views": 23100,
//       "likes": 1456
//     }
//   },
// ]


const ContentManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { youtubeAuthRequired, metrics, socialAccounts } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(loadYoutubeMetrics());
  }, [dispatch]);

  const [filters, setFilters] = useState<Filters>({
    dateRange: "allTime",
    sortBy: "views",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleYoutubeAuth = async () => {
    if (!socialAccounts.find((account) => account.platform === "YouTube")) {
      await authorizeYoutube();
    }
  };

  const filteredMetrics = (Array.isArray(metrics) ? metrics : [])
  .filter((video: any) => {
    if (filters.dateRange === "lastWeek") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const videoDate = new Date(video.uploadedAt);
      return videoDate >= oneWeekAgo;
    }
    if (filters.dateRange === "lastMonth") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      const videoDate = new Date(video.uploadedAt);
      return videoDate >= oneMonthAgo;
    }
    return true;
  })
  .sort((a: any, b: any) => {
    if (filters.sortBy === "views") {
      return b.metrics.views - a.metrics.views;
    }
    if (filters.sortBy === "likes") {
      return b.metrics.likes - a.metrics.likes;
    }
    if (filters.sortBy === "comments") {
      return b.metrics.comments - a.metrics.comments;
    }
    return 0;
  });

const paginatedMetrics = filteredMetrics.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

console.log("Filtered Metrics:", filteredMetrics);
console.log("Paginated Metrics:", paginatedMetrics);
console.log("Current Page:", currentPage);
console.log("Slice Indices:", (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <div className="content-management-page">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 my-10 mx-4">
          Content Management
        </h1>

      {/* YouTube Authorization Button */}
      {youtubeAuthRequired ? (
        <div className="youtube-auth mt-8 p-6 bg-white rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            You need to authorize YouTube
          </h2>
          <YoutubeAuthButton onAuthorize={handleYoutubeAuth} />
        </div>
      ) : (
        <>
          <Filters onChange={handleFiltersChange} />
          {!paginatedMetrics || paginatedMetrics.length === 0 ? (
            <p className="text-center mt-20">No content available to display</p>
          ) : (
            <>
              <div className="video-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
                {paginatedMetrics.map((video: any) => (
                  <VideoCard key={video.id} video={video} />
                ))}
                {/* {
                  dummy.map((video : any) => (
                    <VideoCard video={video}/>
                  ))
                } */}
              </div>
              <PaginationControls
                currentPage={currentPage}
                totalItems={filteredMetrics.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page: any) => setCurrentPage(page)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ContentManagementPage;
