import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800 font-weight-normal">Dashboard</h1>
      <div>
        <button type="button" className="btn btn-primary btn-sm m-1">
          Add item
        </button>
        <button type="button" className="btn btn-primary btn-sm m-1">
          Edit
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
