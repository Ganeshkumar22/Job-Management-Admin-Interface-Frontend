import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobListPage from "./pages/JobListPage";
import JobCreationModal from "./components/JobCreationModal";
import Navbar from "./components/Navbar";

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
      <Navbar openModal={openModal} />

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
