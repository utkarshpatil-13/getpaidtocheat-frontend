// AdminPage.js

import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="flex space-x-4">
        <Link to="/admin/users">
            <button className="btn btn-danger">Generate Payouts</button>
        </Link> 
      </div>
    </div>
  );
};

export default AdminPage;
