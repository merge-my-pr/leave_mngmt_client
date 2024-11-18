import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const Leave = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();

  // Show toast notifications
  const show = (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Fetch leave requests when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      showError('No token found, please log in.');
      navigate('/login'); // Redirect to login if no token
      return;
    }

    // Fetch leave requests using the token
    axios.get('http://localhost:5000/api/leave-requests/my-requests', {
      headers: {
        'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      setLeaveRequests(response.data); // Store leave requests in state
    })
    .catch(error => {
      console.error('Error fetching leave requests:', error);
      showError('Failed to fetch leave requests');
    });
  }, [navigate]);

  // Handle leave request submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all fields are filled
    if (!subject || !content || !from || !to) {
      show('Please fill in all fields');
      return;
    }
  
    // Log the data before submitting
    console.log('Submitting leave request:', { subject, content, from, to });
  
    // Prepare the leave request object including the from and to dates
    const newLeaveRequest = {
      subject,
      content,
      from,
      to
    };
    const token = localStorage.getItem('token');
    console.log(token);
    
    // Submit the leave request to the backend
    axios.post('http://localhost:5000/api/leave-requests/create', newLeaveRequest, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Include the JWT token in the Authorization header
        'Content-Type': 'application/json',
      },       
        withCredentials: true })
      .then(response => {
        toast.success('Leave request submitted successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        // Refresh leave requests after submitting
        setLeaveRequests([...leaveRequests, newLeaveRequest]);
        // Optionally reset form fields after successful submission
        setFrom('');
        setTo('');
        setSubject('');
        setContent('');
      })
      .catch(error => {
        console.error('Error submitting leave request:', error);
        showError('Failed to submit leave request');
      });
  };
  
  return (
    <div className="h-[100vh] w-screen bg-white">
      <div className="h-20 w-screen bg-purple-600 flex flex-wrap">
        <h1 className="mt-6 ml-14 text-3xl font-mono">
          STUDENT MANAGEMENT
        </h1>
      </div>

      <div className="absolute ml-[18%] flex bg-gray-200 w-[80%] h-[80%] mt-8 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">
              From (Start Date)
            </label>
            <input
              type="date"
              id="from"
              className="h-10 w-72 mt-2 p-2 border border-gray-300 rounded"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">
              To (End Date)
            </label>
            <input
              type="date"
              id="to"
              className="h-10 w-72 mt-2 p-2 border border-gray-300 rounded"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="h-10 w-72 mt-2 p-2 border border-gray-300 rounded"
              placeholder="Enter subject (e.g., Sick Leave)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content (Reason for Leave)
            </label>
            <textarea
              id="content"
              className="h-28 w-72 mt-2 p-2 border border-gray-300 rounded"
              placeholder="Enter reason for leave"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-28 h-10 bg-green-500 rounded-xl text-white mt-4"
          >
            Submit
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Your Leave Requests</h2>
          {leaveRequests.length > 0 ? (
            <ul>
              {leaveRequests.map((leave, index) => (
                <li key={index} className="bg-gray-100 p-4 mb-2 rounded">
                  <h3 className="font-bold">{leave.Subject}</h3>
                  <p>{leave.Content}</p>
                  <p><strong>From:</strong> {leave.FromDate}</p>
                  <p><strong>To:</strong> {leave.ToDate}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No leave requests found.</p>
          )}
        </div>
      </div>

      <Sidebar />
      <ToastContainer />
    </div>
  );
};

export default Leave;
