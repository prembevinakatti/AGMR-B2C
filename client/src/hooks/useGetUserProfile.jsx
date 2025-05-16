import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/agmr/auth/getUser`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setUserProfile(response.data.user);
        console.log("User profile", response.data);
      } catch (error) {
        console.log("Error fetching user profile", error);
      }
    };
    fetchUserProfile();
  }, []);
  return userProfile;
};

export default useGetUserProfile;
