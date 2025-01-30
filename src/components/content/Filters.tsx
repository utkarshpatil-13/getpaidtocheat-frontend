import React, { useState } from "react";
import { Link } from "react-router-dom";

interface FiltersProps {
  onChange: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onChange }) => {
  const [filters, setFilters] = useState({
    sortBy: "",
    dateRange: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="filters flex flex-wrap justify-between rounded-xl mb-6 mx-4">
      {/* Filters Section */}
      <div className="border-2 p-4 w-full lg:w-[65%]">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
          Filters
        </h2>
        <div className="flex flex-wrap justify-evenly gap-4">
          {/* Sort By Dropdown */}
          <div className="mb-4 w-full md:w-60">
            <label htmlFor="sortBy" className="block mb-1">
              Sort By
            </label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleInputChange}
              className="w-full border rounded p-2 shadow-lg border-gray-200"
            >
              <option value="">Select</option>
              <option value="views">Views</option>
              <option value="likes">Likes</option>
              <option value="comments">Comments</option>
            </select>
          </div>
          {/* Date Range Dropdown */}
          <div className="mb-4 w-full md:w-60">
            <label htmlFor="dateRange" className="block mb-1">
              Date Range
            </label>
            <select
              id="dateRange"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleInputChange}
              className="w-full border rounded p-2 shadow-lg border-gray-200"
            >
              <option value="">Select</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Upload Section */}
      <div className="w-full lg:w-[30%] bg-white p-6 lg:p-10 border-2 flex flex-col justify-center">
        <Link
          to={"/content-upload"}
          className="px-6 md:px-14 py-2 border rounded-xl shadow-lg border-gray-300 bg-gray-400 text-white hover:bg-gray-800 text-center"
        >
          Content Upload
        </Link>
      </div>
    </div>
  );
};

export default Filters;
