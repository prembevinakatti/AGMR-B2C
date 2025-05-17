import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetPendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/agmr/emp/leave/getPendingRequests`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setPendingRequests(response.data.pendingRequests);
        console.log("Pending Requests", response.data);
      } catch (error) {
        console.log("Error Getting Pending Requests", error);
      }
    };
    fetchPendingRequests();
  }, []);
  return pendingRequests;
};

export default useGetPendingRequests;
