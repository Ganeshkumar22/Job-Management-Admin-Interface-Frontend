import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListPage from "./pages/JobListPage";
import JobCreationModal from "./components/JobCreationModal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobsUpdated, setJobsUpdated] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleJobCreated = () => {
    closeModal();
    setJobsUpdated((prev) => !prev); // Toggle to trigger re-fetch in JobListPage
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md mx-65 mt-5 rounded-full">
          <div className="container mx-auto px-5">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center justify-between space-x-15">
                <div className="objectfit-cover">
                  <img className="object-cover h-10 w-10 rounded-full"
                    src="./public/cybermind_works_logo-qLEHG32l.jpeg"
                    alt="logo"
                  />
                </div>
                <h1>Home</h1>
                <h1>Find Jobs</h1>
                <h1>Find Talents</h1>
                <h1>About Us</h1>
                <h1>Testimonials</h1>
              </div>
              <div className="flex">
                <button
                  onClick={openModal}
                  className="ml-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 rounded-full"
                >
                  Create Job
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={<JobListPage jobsUpdated={jobsUpdated} />}
            />
          </Routes>

          {/* Job Creation Modal */}
          {isModalOpen && (
            <JobCreationModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onJobCreated={handleJobCreated}
            />
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
