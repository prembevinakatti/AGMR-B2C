import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllRequests = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/agmr/emp/leave/getAllRequests`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("Requests : ", response.data);
        setRequests(response.data.requests);
      } catch (error) {
        console.log("Error Getting Requests : ", error);
      }
    };
    fetchRequests();
  }, []);
  return requests;
};

export default useGetAllRequests;
