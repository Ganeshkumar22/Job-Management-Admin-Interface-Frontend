import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import JobCard from '../components/JobCard';

const JobListPage = ({ jobsUpdated }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, watch } = useForm({
    defaultValues: {
      jobTitle: '',
      location: '',
      jobType: '',
      minSalary: 0,
      maxSalary: 200000
    }
  });

  const jobTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  
  // Watch individual fields instead of all fields
  const jobTitle = watch('jobTitle');
  const location = watch('location');
  const jobType = watch('jobType');
  const minSalary = watch('minSalary');
  const maxSalary = watch('maxSalary');
  
  // Fetch jobs from API
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
      // Don't set filtered jobs here - let the filter effect handle that
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, jobsUpdated]); // Re-fetch when jobsUpdated changes

  // Filter jobs whenever the filter criteria change
  useEffect(() => {
    if (jobs.length === 0) return; // Skip filtering if no jobs
    
    const filtered = jobs.filter(job => {
      const matchesTitle = job.title.toLowerCase().includes(jobTitle.toLowerCase()) || !jobTitle;
      const matchesLocation = job.location.toLowerCase().includes(location.toLowerCase()) || !location;
      const matchesType = job.jobType === jobType || !jobType;
      
      // Extract numeric value from salary string for comparison
      const salaryNum = parseInt(job.salary.replace(/[^0-9]/g, ''));
      const matchesSalary = (!minSalary || salaryNum >= minSalary) && 
                           (!maxSalary || salaryNum <= maxSalary);
      
      return matchesTitle && matchesLocation && matchesType && matchesSalary;
    });
    
    setFilteredJobs(filtered);
  }, [jobs, jobTitle, location, jobType, minSalary, maxSalary]);

  return (
    <div className="container mx-auto px-4 py-4">
      
      {/* Filter Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              {...register('jobTitle')}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search by title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              {...register('location')}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Search by location"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type
            </label>
            <select
              {...register('jobType')}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Types</option>
              {jobTypeOptions.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary Range: ${minSalary} - ${maxSalary}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                {...register('minSalary')}
                min="0"
                max="200000"
                step="10000"
                className="w-full"
              />
              <input
                type="range"
                {...register('maxSalary')}
                min="0"
                max="200000"
                step="10000"
                className="w-full"
              />
            </div>
          </div>
        </form>
      </div>
      
      {/* Job Listings */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard 
              key={job._id} 
              job={job}
              onJobUpdated={fetchJobs} // Call fetchJobs directly
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">No jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default JobListPage;