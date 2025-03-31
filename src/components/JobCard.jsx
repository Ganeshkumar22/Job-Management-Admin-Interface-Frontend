import React from "react";
import { format } from "date-fns";

const JobCard = ({ job }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="/company-default-logo.png"
            alt="logo"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mt-2">{job.title}</h2>
        <div className="flex justify-between mt-2">
          <p className="text-gray-600 font-medium">👤1-3 yr</p>
          <p className="text-gray-600 font-medium">🏢{job.companyName}</p>
          <p className="text-gray-600 font-medium">${job.salary}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-500">{job.location}</p>
        </div>

        <p className="text-gray-700 mb-2 line-clamp-3">{job.description}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.jobType === "Full-time"
                ? "bg-green-100 text-green-800"
                : job.jobType === "Part-time"
                ? "bg-blue-100 text-blue-800"
                : job.jobType === "Contract"
                ? "bg-purple-100 text-purple-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {job.jobType}
          </span>
          <span>
            DeadLine:<br></br>
            {formatDate(job.applicationDeadline)}
          </span>
        </div>
      </div>

      <div className="px-4 mb-5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <button className="w-100 bg-sky-500 py-3 rounded-lg text-white">
          Apply Now
        </button>
        {/* <button 
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => window.location.href = `/edit-job/${job._id}`}
        >
          Edit
        </button>
        <button 
          className="text-red-600 hover:text-red-800 font-medium"
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this job?')) {
              try {
                await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}`/api/jobs`${job._id}`, {
                  method: 'DELETE',
                });
                window.location.reload();
              } catch (error) {
                console.error('Error deleting job:', error);
              }
            }
          }}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default JobCard;
