import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const JobCreationModal = ({ isOpen, onClose, onJobCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      title: '',
      companyName: '',
      location: '',
      jobType: 'Full-time',
      salary: '',
      description: '',
      requirements: '',
      responsibilities: '',
      applicationDeadline: ''
    }
  });
  
  const jobTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/jobs`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.status === 200 || response.status === 201) {
        reset(); // Reset form fields
        onJobCreated(); // Notify parent component
      } else {
        console.error('Error creating job:', response.data);
        alert('Failed to create job. Please try again.');
      }
    } catch (error) {
      console.error('Error creating job:', error.response?.data || error.message);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Create Job Opening</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('title', { required: 'Job title is required' })}
                  className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g. Frontend Developer"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
              
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('companyName', { required: 'Company name is required' })}
                  className={`w-full p-2 border rounded ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g. Acme Inc."
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                )}
              </div>
              
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('location', { required: 'Location is required' })}
                  className={`w-full p-2 border rounded ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g. San Francisco, CA"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>
              
              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('jobType', { required: 'Job type is required' })}
                  className={`w-full p-2 border rounded ${errors.jobType ? 'border-red-500' : 'border-gray-300'}`}
                >
                  {jobTypeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.jobType && (
                  <p className="mt-1 text-sm text-red-600">{errors.jobType.message}</p>
                )}
              </div>
              
              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('salary', { required: 'Salary range is required' })}
                  className={`w-full p-2 border rounded ${errors.salary ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g. $80,000 - $100,000"
                />
                {errors.salary && (
                  <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
                )}
              </div>
              
              {/* Application Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register('applicationDeadline', { required: 'Application deadline is required' })}
                  className={`w-full p-2 border rounded ${errors.applicationDeadline ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.applicationDeadline && (
                  <p className="mt-1 text-sm text-red-600">{errors.applicationDeadline.message}</p>
                )}
              </div>
            </div>
            
            {/* Job Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('description', { required: 'Job description is required' })}
                rows={4}
                className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Provide a detailed description of the job..."
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
            
            {/* Requirements */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('requirements', { required: 'Requirements are required' })}
                rows={4}
                className={`w-full p-2 border rounded ${errors.requirements ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="List the requirements for this job..."
              ></textarea>
              {errors.requirements && (
                <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
              )}
            </div>
            
            {/* Responsibilities */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsibilities <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('responsibilities', { required: 'Responsibilities are required' })}
                rows={4}
                className={`w-full p-2 border rounded ${errors.responsibilities ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="List the responsibilities for this job..."
              ></textarea>
              {errors.responsibilities && (
                <p className="mt-1 text-sm text-red-600">{errors.responsibilities.message}</p>
              )}
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Creating...' : 'Create Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobCreationModal;