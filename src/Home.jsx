import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const Home = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const navigate = useNavigate();

  // Show error toast
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
    // Get the token from localStorage
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

  return (
    <div className="h-[100vh] w-screen bg-white">
      <div className="h-20 w-screen bg-purple-600 flex flex-wrap">
        <h1 className="mt-6 ml-14 text-3xl font-mono">
          STUDENT MANAGEMENT
        </h1>
      </div>

      <div className="absolute ml-[18%] flex bg-gray-200 w-[80%] h-[80%] mt-8 p-6">
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

export default Home;
